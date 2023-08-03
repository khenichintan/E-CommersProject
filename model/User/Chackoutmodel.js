const mongoose = require('mongoose');

const Chackoutschema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Mobile_No: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    Pin: {
        type: String,
        required: true,
    },
    City: {
        type: String,
        required: true,
    },
    State: {
        type: String,
        required: true,
    },
    Country: {
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
    isActive: {
        type: Boolean,
        required: true
    }
})

const Chackout = mongoose.model('Chackout', Chackoutschema);
module.exports = Chackout;