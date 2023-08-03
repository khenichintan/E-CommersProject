const Category = require('../../model/Admin/Categorymodel');

const subcategory = require('../../model/Admin/subcategorymodel');

const Extracat = require('../../model/Admin/Extracatmodel');

const Brand = require('../../model/Admin/Brandmodel');

//Active
module.exports.deactive = async(req, res) => {
    let data = await Brand.findByIdAndUpdate(req.params.id, { isActive: false })
    return res.redirect('back')
};

module.exports.active = async(req, res) => {
    let data = await Brand.findByIdAndUpdate(req.params.id, { isActive: true })
    return res.redirect('back')
};

//Deactive

module.exports.BrandAdd = async(req, res) => {
    try {
        let cetdata = await Category.find({})
        let subcatdata = await subcategory.find({})
        return res.render('AdminPanal/Brand/BrandAdd', {
            cetdata: cetdata,
            subcatdata: subcatdata
        })
    } catch (error) {
        console.log(error, "Brand Add");
    }
};

module.exports.getExtracategory = async(req, res) => {
    try {
        let extradata = await Extracat.find({ subcat_id: req.body.subid });
        return res.render('AdminPanal/Brand/ajaxextraBrand', {
            extradata: extradata
        })
    } catch (error) {
        console.log(error, "Exrta cat view");
    }
};

module.exports.Brandrecord = async(req, res) => {
    try {
        let nDate = new Date().toLocaleString('en-us', {
            timeZone: 'Asia/Calcutta'
        })

        req.body.isActive = true;
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;

        let data = await Brand.create(req.body)
        if (data) {
            return res.redirect('back')
        } else {
            console.log(err);
        }
    } catch (error) {
        console.log(error, "brand add error");
    }
};

module.exports.BrandView = async(req, res) => {
    try {
        let data = await Brand.find({}).populate('cat_id').populate('subcat_id').populate('Extracat_id').exec();
        if (data) {
            return res.render('AdminPanal/Brand/BrandView', { Branddata: data })
        }
    } catch (error) {
        console.log(error, "Brand View");
    }
};

module.exports.delete = async(req, res) => {
    try {
        let data = await Brand.findByIdAndDelete(req.params.id)
        if (data) {
            return res.redirect('back')
        } else {
            console.log(err);
        }
    } catch (error) {
        console.log(error, "Brand delete");
    }
};

module.exports.update = async(req, res) => {
    try {
        let cetdata = await Category.find({})
        let subcetdata = await subcategory.find({})
        let Excatdata = await Extracat.find({});
        let data = await Brand.findById(req.params.id);
        if (data) {
            return res.render('AdminPanal/Brand/BrandUpdate', {
                data: data,
                cetdata: cetdata,
                subcetdata: subcetdata,
                Excatdata: Excatdata
            })
        }
    } catch (error) {
        console.log(error, "Extracat update");
    }
};

module.exports.Brandupdate = async(req, res) => {
    let brandid = req.body.brid
    try {
        let data = await Brand.findByIdAndUpdate(brandid, req.body);
        if (data) {
            return res.redirect('/Admin/Brand/BrandView')
        }
    } catch (error) {
        console.log(error, "Brand update sucess");
    }
};