const mongoose = require('mongoose');
const { request } = require('express');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    role: {type: String, default: "buyer"},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    street: {type: String, required: true},
    number_ext: {type: String, required: true},
    suburb: {type: String, required: true},
    zip_code: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', UserSchema)
