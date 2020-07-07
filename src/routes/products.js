const express = require('express');
const { route } = require('.');
const router = express.Router();

const Product = require('../models/Product');
const { isAuthenticated } = require('../helpers/auth')

router.get('/products/add-product', isAuthenticated, (req, res) => {
    res.render('products/new-product');
});

router.post('/products/new-product', isAuthenticated, async (req, res) => {
    const { name, price, description } = req.body;
    const imgFile = req.file.filename;
    const errors = [];

    if (!name) {
        errors.push({ text: '¡No le has dado un nombre a tu creación!' });
    }
    if (!price) {
        errors.push({ text: '¿Cuánto me costará eso?' });
    }
    if (!description) {
        errors.push({ text: '¡Te hace falta la descripción!' });
    }
    if (errors.length > 0) {
        res.render('products/new-product', {
            errors,
            name,
            price,
            description,
            imgFile
        });
    } else {
        const newProduct = new Product({ name, imgFile, price, description });
        await newProduct.save();
        req.flash('success_msg', '¡El producto se agregó correctamente!');
        res.redirect('/products')
    }
});

router.get('/products/edit-product/:id', isAuthenticated, async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('products/edit-product', { product });
});

router.put('/products/edit-product-done/:id', isAuthenticated, async (req, res) => {
    const { name, price, description } = req.body;
    const imgFile = req.file.filename;
    await Product.findByIdAndUpdate(req.params.id, { name, imgFile, price, description });
    req.flash('success_msg', '¡Se actualizó correctamente el producto!');
    res.redirect('/products'); 
});

router.delete('/products/delete/:id', isAuthenticated, async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'El producto se eliminó correctamente');
    res.redirect('/products');
});

module.exports = router;