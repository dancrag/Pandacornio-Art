const express = require('express');
const { route } = require('.');
const router = express.Router();

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.get('/users/signup', (req, res) => {
    res.send('Formulario de autenticación');
});

module.exports = router;