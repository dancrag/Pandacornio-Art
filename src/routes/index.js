const express = require('express');
const { route } = require('.');
const router = express.Router();

const Product = require('../models/Product');

//routes
router.get('/', async (req, res) => {
  const products = await Product.find().limit(3).sort({ date: 'desc' });
  res.render('index', {products});
});

router.get('/contact', (req, res) => {
  res.render('contact');
});

router.get('/products', async (req, res) => {
  const products = await Product.find().sort({ name: 'asc' });
  res.render('products/products', {products});
});


router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;
