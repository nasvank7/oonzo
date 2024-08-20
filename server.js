require('@babel/register')({
    presets: ['@babel/preset-env', '@babel/preset-react']
});

const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const { StaticRouter } = require('react-router-dom/server');
const ProductList = require('./src/components/ProductList').default;
const ProductDetail = require('./src/components/ProductDetail').default;

const app = express();

app.use(express.static(path.resolve(__dirname, 'build')));

// SSR for Product List
app.get('/', (req, res) => {
    axios.get('https://fakestoreapi.com/products')
        .then(response => {
            const products = response.data;
            const currentPage = 1; // Default to page 1

            const appHtml = ReactDOMServer.renderToString(
                <StaticRouter location={req.url} context={{}}>
                    <ProductList 
                        products={products} 
                        currentPage={currentPage} 
                        paginate={() => {}} // Pagination function not needed on the server
                    />
                </StaticRouter>
            );

            const indexFile = path.resolve('./build/index.html');
            fs.readFile(indexFile, 'utf8', (err, data) => {
                if (err) {
                    console.error('Something went wrong:', err);
                    return res.status(500).send('Oops, better luck next time!');
                }

                return res.send(
                    data.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
                );
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            res.status(500).send('Error fetching products');
        });
});

// SSR for Product Detail
app.get('/product/:id', (req, res) => {
    const { id } = req.params;

    axios.get(`https://fakestoreapi.com/products/${id}`)
        .then(response => {
            const product = response.data;

            const appHtml = ReactDOMServer.renderToString(
                <StaticRouter location={req.url} context={{}}>
                    <ProductDetail product={product} />
                </StaticRouter>
            );

            const indexFile = path.resolve('./build/index.html');
            fs.readFile(indexFile, 'utf8', (err, data) => {
                if (err) {
                    console.error('Something went wrong:', err);
                    return res.status(500).send('Oops, better luck next time!');
                }

                return res.send(
                    data.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
                );
            });
        })
        .catch(error => {
            console.error('Error fetching product details:', error);
            res.status(500).send('Error fetching product details');
        });
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
