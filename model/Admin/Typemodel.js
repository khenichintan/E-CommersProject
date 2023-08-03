const mongoose = require('mongoose');

const TypeSchema = mongoose.Schema({
    cat_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    subcat_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory',
        required: true
    },
    Extracat_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Extracat',
        required: true
    },
    Typename: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    updatedAt: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Type = mongoose.model('Type', TypeSchema);
module.exports = Type;