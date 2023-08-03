const mongoose = require('mongoose');

const path = require('path');

const singleimage = "/upload/singleimage";
const multimage = "/upload/Product";

const multer = require('multer');

const ProductSchema = mongoose.Schema({
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
    Brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    Type_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type',
        required: true
    },
    Productname: {
        type: String,
        required: true
    },
    productsize: {
        type: Array,
        required: true
    },
    productcolor: {
        type: Array,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    OldPrice: {
        type: String,
        required: true
    },
    Discounte: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    multimage: {
        type: Array,
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

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        if (file.fieldname == 'image') {
            cd(null, path.join(__dirname, "../..", singleimage))
        } else {
            cd(null, path.join(__dirname, "../..", multimage))
        }
    },
    filename: (req, file, cd) => {
        cd(null, file.fieldname + "-" + Date.now())
    }
});

ProductSchema.statics.uploadimage = multer({ storage: storage }).fields([{ name: "image", maxCount: 1 }, { name: "multimage", maxCount: 5 }]);
ProductSchema.statics.singleimage = singleimage;
ProductSchema.statics.multimage = multimage;

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;