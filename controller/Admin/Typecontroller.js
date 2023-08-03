const Category = require('../../model/Admin/Categorymodel');

const subcategory = require('../../model/Admin/subcategorymodel');

const Extracat = require('../../model/Admin/Extracatmodel');

const Type = require('../../model/Admin/Typemodel');

//Active
module.exports.deactive = async(req, res) => {
    let data = await Type.findByIdAndUpdate(req.params.id, { isActive: false })
    return res.redirect('back')
};

module.exports.active = async(req, res) => {
    let data = await Type.findByIdAndUpdate(req.params.id, { isActive: true })
    return res.redirect('back')
};

//Deactive

module.exports.TypeAdd = async(req, res) => {
    try {
        let cetdata = await Category.find({})
        let subcatdata = await subcategory.find({})
        return res.render('AdminPanal/Type/TypeAdd', {
            cetdata: cetdata,
            subcatdata: subcatdata
        })
    } catch (error) {
        console.log(error, "Type Add");
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

module.exports.Typerecord = async(req, res) => {
    try {
        let nDate = new Date().toLocaleString('en-us', {
            timeZone: 'Asia/Calcutta'
        })

        req.body.isActive = true;
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;

        let data = await Type.create(req.body)
        if (data) {
            return res.redirect('back')
        } else {
            console.log(err);
        }
    } catch (error) {
        console.log(error, "Type add error");
    }
};

module.exports.TypeView = async(req, res) => {
    try {
        let data = await Type.find({}).populate('cat_id').populate('subcat_id').populate('Extracat_id').exec();
        if (data) {
            return res.render('AdminPanal/Type/TypeView', { Typedata: data })
        }
    } catch (error) {
        console.log(error, "Type View");
    }
};

module.exports.delete = async(req, res) => {
    try {
        let data = await Type.findByIdAndDelete(req.params.id)
        if (data) {
            return res.redirect('back')
        } else {
            console.log(err);
        }
    } catch (error) {
        console.log(error, "Type delete");
    }
};

module.exports.update = async(req, res) => {
    try {
        let cetdata = await Category.find({})
        let subcetdata = await subcategory.find({})
        let Excatdata = await Extracat.find({});
        let data = await Type.findById(req.params.id);
        if (data) {
            return res.render('AdminPanal/Type/TypeUpdate', {
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

module.exports.Typeupdate = async(req, res) => {
    let Typeid = req.body.brid
    try {
        let data = await Type.findByIdAndUpdate(Typeid, req.body);
        if (data) {
            return res.redirect('/Admin/Type/TypeView')
        }
    } catch (error) {
        console.log(error, "Type update sucess");
    }
};