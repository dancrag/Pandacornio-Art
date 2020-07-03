const express = require('express');
const { route } = require('.');
const router = express.Router();

const Product = require('../models/Product');

router.get('/products/add-product', (req, res) => {
    res.render('products/new-product');
});

router.post('/products/new-product', async (req, res) => {
    console.log(req.body);
    const {name, price, description} = req.body;
    const errors = [];
    
    if(!name){
        errors.push({text:'¡No le has dado un nombre a tu creación!'});
    }
    if (!price) {
        errors.push({text: '¿Cuánto me costará eso?'});
    }
    if (!description) {
        errors.push({text: '¡Te hace falta la descripción!'});
    }
    if (errors.length > 0) {
        res.render('products/new-product', {
            errors,
            name,
            price
        });
    } else {
        const newProduct = new Product({name, price, description});
        await newProduct.save();
        res.redirect('/products')
    }
});

module.exports = router;