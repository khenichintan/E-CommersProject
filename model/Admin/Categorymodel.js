const mongoose = require('mongoose');

const path = require('path');

const avatarpath = "/upload/Category";

const multer = require('multer');

const categorySchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    image: {
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

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, path.join(__dirname, "../..", avatarpath))
    },
    filename: (req, file, cd) => {
        cd(null, file.fieldname + "-" + Date.now())
    }
});

categorySchema.statics.uploadavatar = multer({ storage: storage }).single('image');
categorySchema.statics.avatarpath = avatarpath;

const category = mongoose.model('category', categorySchema);
module.exports = category;