const Category = require('../../model/Admin/Categorymodel');

const path = require('path');

const fs = require('fs');

// Active Deactive

module.exports.deactive = async(req, res) => {
    let data = await Category.findByIdAndUpdate(req.params.id, { isActive: false })
    return res.redirect('back')
}

module.exports.active = async(req, res) => {
    let data = await Category.findByIdAndUpdate(req.params.id, { isActive: true })
    return res.redirect('back')
}

// Active Deactive

module.exports.CategoryAdd = async(req, res) => {
    try {
        return res.render('AdminPanal/Category/CategoryAdd')
    } catch (error) {
        console.log(error, "category add")
    }
};

module.exports.categoryrecord = async(req, res) => {
    try {
        let nDate = new Date().toLocaleString('en-us', {
            timeZone: 'Asia/Calcutta'
        })

        var imagepath = '';
        if (req.file) {
            imagepath = Category.avatarpath + "/" + req.file.filename;
        };

        req.body.image = imagepath;

        req.body.isActive = true;
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;

        let data = await Category.create(req.body)
        if (data) {
            return res.redirect('back')
        } else {
            console.log(err)
        }
    } catch (error) {
        console.log(error, "catogery");
    }
};

module.exports.CategoryView = async(req, res) => {
    try {
        let data = await Category.find({})
        if (data) {
            return res.render('AdminPanal/Category/CategoryView', {
                admindata: data
            })
        }
    } catch (error) {
        console.log(error, "Category View");
    }
};

module.exports.delete = async(req, res) => {
    try {
        let record = await Category.findById(req.params.id)
        if (record) {
            var imagepath = path.join(__dirname, '../../', record.image);
            if (imagepath) {
                fs.unlinkSync(imagepath)
            }
        }
        let data = await Category.findByIdAndDelete(req.params.id)
        if (data) {
            return res.redirect('back')
        }
    } catch (error) {
        console.log(error, "delete category");
    }
};

module.exports.update = async(req, res) => {
    try {
        let data = await Category.findById(req.params.id)
        if (data) {
            return res.render('AdminPanal/Category/CategoryUpdate', {
                data: data
            })
        }
    } catch (error) {
        console.log(error, "update error")
    }
};

module.exports.categoryupdate = async(req, res) => {
    let categoryid = req.body.caid;
    try {
        if (req.file) {
            let data = await Category.findById(categoryid)
            if (data) {

                var imagepath = path.join(__dirname, '../../', data.image)
                if (imagepath) {
                    fs.unlinkSync(imagepath)
                }

                var newpath = Category.avatarpath + '/' + req.file.filename;
                req.body.image = newpath

                const uDate = new Date().toLocaleString('en-US', {
                    timeZone: 'Asia/Calcutta'
                });

                req.body.updatedAt = uDate;

                let record = await Category.findByIdAndUpdate(categoryid, req.body)
                if (record) {
                    return res.redirect('/Admin/category/CategoryView')
                } else {
                    console.log('data not updated (if) ');
                }
            }
        } else {
            let data = await Category.findById(categoryid)
            if (data) {
                req.body.image = data.image;

                const uDate = new Date().toLocaleString('en-US', {
                    timeZone: 'Asia/Calcutta'
                });

                req.body.updatedAt = uDate;

                let record = await Category.findByIdAndUpdate(categoryid, req.body)
                if (record) {
                    return res.redirect('/Admin/category/CategoryView')
                } else {
                    console.log('data not updated (else) ');
                }
            } else {
                console.log("update data not found in (else)");
            }
        }
    } catch (error) {
        console.log("data  update err : ", error);
    }
}