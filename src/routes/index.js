const express = require('express');
const { route } = require('.');
const router = express.Router();

const Product = require('../models/Product');

//routes
router.get('/', (req, res) => {
  res.render('index.html', {title: 'Home', subtitle: 'Pandacornio.Art'});
});

router.get('/contact', (req, res) => {
  res.render('contact.html', {title: 'Contact'});
});

router.get('/products', async (req, res) => {
  const products = await Product.find().lean();
  //console.log(products)
  res.render('products', {products})
  console.log(products)
});

router.get('/about', (req, res) => {
  res.render('about.html', {title: 'About'})
});

module.exports = router;
