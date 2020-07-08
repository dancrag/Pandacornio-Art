const express = require('express');
const { route } = require('.');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send-email', async (req, res) => {
    const {name, email, phone, message} = req.body;

    const messageOps = {
        to: 'danielcruz1im18@gmail.com',
        cc: email,
        subject: 'Pedido Especial de ' + name + ' ' + phone,
        text: message
    };

    const transporter = nodemailer.createTransport({
        pool: true,
        service: 'Gmail',
        //host: 'smtp.gmail.com',
        //port: '465',
        //secure: true,
        auth: {
            type: 'OAuth2',
            user: 'danielcruz1im18@gmail.com',
            refreshToken: '1//04BeKBUp4bq5LCgYIARAAGAQSNwF-L9IrpjgowUCHwKjjOqm-Nu-Um7TcTXV6OO_yYlQ1Z4PftASusPDJ-0YSRZ7C3IbeQybvqGc',
            clientId: '859027338619-i4ct9kjpina85l20qbrdbio71apnqc5t.apps.googleusercontent.com',
            clientSecret: 'XdKTFw1b_xP5-7Db8HcBJfdw',
        }
    });

    await transporter.sendMail(messageOps, function (err, info) {
        if (err) {
            console.log(err);
            
        } else {
            transporter.on('token', token => {
                console.log('A new access token was generated');
                console.log('User: %s', token.user);
                console.log('Access Token: %s', token.accessToken);
                console.log('Expires: %s', new Date(token.expires));
            });
        }
    });
    req.flash('success_msg', '¡Se envió tu correo, pronto te contactaremos!');
    res.redirect('/');
}); 

module.exports = router;