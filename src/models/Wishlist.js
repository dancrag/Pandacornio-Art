const mongoose = require('mongoose');
const { Schema } = mongoose;

const WishlistSchema = new Schema({
    id_product: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Wishlist', WishlistSchema)