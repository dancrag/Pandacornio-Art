const express = require('express');
const router = express.Router()

//routes
router.get('/', (req, res) => {
  res.render('index.html', {title: 'Home', subtitle: 'Pandacornio.Art'});
});

router.get('/contact', (req, res) => {
  res.render('contact.html', {title: 'Contact'});
});

router.get('/products', (req, res) => {
  res.render('products.html', {title: 'Products' })
});

router.get('/about', (req, res) => {
  res.render('about.html', {title: 'About'})
});

module.exports = router;
