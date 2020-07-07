const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: {type: String, required: true},
    imgFile: {type: String, required: false, default: 'logo.png'},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Product', ProductSchema)

