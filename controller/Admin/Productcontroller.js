const Category = require('../../model/Admin/Categorymodel');

const subcategory = require('../../model/Admin/subcategorymodel');

const Extracat = require('../../model/Admin/Extracatmodel');

const Brand = require('../../model/Admin/Brandmodel');

const Type = require('../../model/Admin/Typemodel');

const Product = require('../../model/Admin/Productmodel');

//Active
module.exports.deactive = async(req, res) => {
    let data = await Product.findByIdAndUpdate(req.params.id, { isActive: false })
    return res.redirect('back')
};

module.exports.active = async(req, res) => {
    let data = await Product.findByIdAndUpdate(req.params.id, { isActive: true })
    return res.redirect('back')
};

//Deactive

module.exports.ProductAdd = async(req, res) => {
    try {
        let cetdata = await Category.find({})
        let subcatdata = await subcategory.find({})
        return res.render('AdminPanal/Product/ProductAdd', {
            cetdata: cetdata,
            subcatdata: subcatdata
        })
    } catch (error) {
        console.log(error, "Product Add");
    }
};

module.exports.getBrandType = async(req, res) => {
    try {
        // console.log(req.body.id);
        let Brandtdata = await Brand.find({ Extracat_id: req.body.id });
        let Typedata = await Type.find({ Extracat_id: req.body.id });
        // console.log("b data", Brandtdata);
        // console.log("T data", Typedata);
        return res.render('AdminPanal/Product/ajaxBrandType', {
            Brandtdata,
            Typedata
        })
    } catch (error) {
        console.log(error, "Brand Type view");
    }
};

module.exports.Productrecord = async(req, res) => {
    console.log(req.files);
    console.log(req.body);
    try {
        let nDate = new Date().toLocaleString('en-us', {
            timeZone: 'Asia/Calcutta'
        })

        req.body.isActive = true;
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;

        // singleimage
        var singleimage = '';
        if (req.files.image) {
            singleimage = Product.singleimage + '/' + req.files.image[0].filename;
        }
        req.body.image = singleimage;

        // multimage
        var multimage = [];
        if (req.files.multimage) {
            for (var i = 0; i < req.files.multimage.length; i++) {
                multimage.push(Product.multimage + '/' + req.files.multimage[i].filename)
            }
        }
        req.body.multimage = multimage;

        let data = await Product.create(req.body)
        if (data) {
            return res.redirect('back')
        } else {
            console.log(err)
        }
    } catch (error) {
        console.log(error, "Product add");
    }
};

module.exports.ProductView = async(req, res) => {
    try {
        let data = await Product.find({}).populate('cat_id').populate('subcat_id').populate('Extracat_id').populate('Brand_id').populate('Type_id').exec();
        if (data) {
            return res.render('AdminPanal/Product/ProductView', {
                Productdata: data
            })
        }
    } catch (error) {
        console.log(error, "Product View");
    }
};

module.exports.Update = async(req, res) => {
    try {
        let cetdata = await Category.find({})
        let subcetdata = await subcategory.find({})
        let Excatdata = await Extracat.find({});
        let Branddata = await Brand.find({});
        let Typedata = await Type.find({});
        let Productdata = await Product.findById(req.params.id);
        if (Productdata) {
            return res.render('AdminPanal/Product/ProductUpdate', {
                cetdata: cetdata,
                subcetdata: subcetdata,
                Excatdata: Excatdata,
                Branddata: Branddata,
                Typedata: Typedata,
                Productdata: Productdata
            })
        }
    } catch (error) {
        console.log(error, "ProductUpdate");
    }
};

module.exports.ProductUpdate = async(req, res) => {
    let Productid = req.body.prid;
    try {
        if (req.file) {
            let data = await Product.findById(Productid)
            if (data) {
                var imagepath = path.join(__dirname, '../../ ', data.image)
                if (imagepath) {
                    fs.unlinkSync(imagepath)
                }

                var newpath = Product.singleimage + "/" + req.file.filename;
                req.body.image = newpath;

                const uDate = new Date().toLocaleString('en-US', {
                    timeZone: 'Asia/Calcutta'
                });

                req.body.updatedAt = uDate;

                let record = await Product.findByIdAndUpdate(Productid, req.body)
                if (record) {
                    return res.redirect('/Product/ProductView')
                } else {
                    console.log('data not updated (if) ');
                }
            }
        } else {
            let data = await Product.findById(Productid)
            if (data) {
                req.body.image = data.image

                const uDate = new Date().toLocaleString('en-US', {
                    timeZone: 'Asia/Calcutta'
                });

                req.body.updatedAt = uDate;

                let record = await Product.findByIdAndUpdate(Productid, req.body)
                if (record) {
                    return res.redirect('/Product/ProductView')
                } else {
                    console.log('data not updated (if) ');
                }
            } else {
                console.log("update data not found in (else)");
            }
        }
    } catch (error) {
        console.log(error, "Product Update");
    }
}