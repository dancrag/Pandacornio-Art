const express = require('express');
const router = express.Router()

//routes
router.get('/', (req, res) => {
  res.render('index.html', {title: 'First website', subtitle: 'Pandacornio'});
});

router.get('/contact', (req, res) => {
  res.render('contact.html', {title: 'Contact Page'});
});

router.get('/products', (req, res) => {
res.render('products.html', {title: 'Products' })
});

module.exports = router;
