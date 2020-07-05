const express = require('express');
const { route } = require('.');
const router = express.Router();

const Product = require('../models/Product');

//routes
router.get('/', (req, res) => {
  res.render('index', {title: 'Home', subtitle: 'Pandacornio.Art'});
});

router.get('/contact', (req, res) => {
  res.render('contact', {title: 'Contact'});
});

router.get('/products', async (req, res) => {
  const products = await Product.find().sort({name: 'asc'});
  res.render('products/products', {products});
});

router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;
