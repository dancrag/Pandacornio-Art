const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: {type: String, required: true},
    url: {type: String, required: false},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Product', ProductSchema)

