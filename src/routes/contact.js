const express = require('express');
const { route } = require('.');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send-email', async (req, res) => {
    const {name, email, phone, message} = req.body;

    const messageOps = {
        from: 'danielcruz1im18@gmail.com',
        to: 'danielcruz1im18@gmail.com',
        subject: ('Pedido Especial de', name, phone),
        text: message 
    };

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: '587',
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'danielcruz1im18@gmail.com',
            pass: 'mentehaurire28'
        }
    });

    await transporter.sendMail(messageOps, function (err, info) {
        if (err) {
            console.log(err);
            
        } else {
            console.log(info);
        }
    });

    req.flash('success_msg', '¡Se envió tu correo, pronto te contactaremos!');
    res.redirect('/');
}); 

module.exports = router;