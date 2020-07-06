const express = require('express');
const { route } = require('.');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const { session } = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/products',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    const {first_name, last_name, email, password, confirm_password, street, number_ext, suburb, zip_code, city, state} = req.body;
    const errors = [];
    if (first_name.length <= 0 || email.length <= 0 || password.length <= 0 || confirm_password <= 0) {
        errors.push({text: 'Alguno de los campos están vacío'})
    }
    if (password != confirm_password) {
        errors.push({text: 'Las contraseñas no coinciden'});
    }
    if (password.length <= 4) {
        errors.push({text: 'La contraseña debe ser mayor a 4 caracteres'});
    }
    if (errors.length > 0) {
        res.render('users/signup', {errors, first_name, email, password, confirm_password});
    } else {
        const emailUser = await User.findOne({email: email});
        if (emailUser) {
            req.flash('error_msg', 'El email ya está registrado');
            res.redirect('/users/signup');
        }
        const newUser = new User({first_name, last_name, email, password, street, number_ext, suburb, zip_code, city, state});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Te has registrado correctamente');
        res.redirect('/users/signin');
    }
    console.log('Registro correcto');
    
})

router.get('/users/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
})

module.exports = router;