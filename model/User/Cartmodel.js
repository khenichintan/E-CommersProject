const mongoose = require('mongoose');

const schema = mongoose.Schema({
    Product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    productsize: {
        type: String,
        required: true,
    },
    productcolor: {
        type: String,
        required: true,
    },
    createAt: {
        type: String,
        required: true
    },
    updateAt: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
})

const cart = mongoose.model('cart', schema);
module.exports = cart;