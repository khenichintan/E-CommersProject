const mongoose = require('mongoose');

const BrandSchema = mongoose.Schema({
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
    Brandname: {
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

const Brand = mongoose.model('Brand', BrandSchema);
module.exports = Brand;