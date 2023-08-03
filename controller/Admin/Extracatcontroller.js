const Category = require('../../model/Admin/Categorymodel');

const subcategory = require('../../model/Admin/subcategorymodel');

const Extracat = require('../../model/Admin/Extracatmodel');

// Active Deactive

module.exports.deactive = async(req, res) => {
    let data = await Extracat.findByIdAndUpdate(req.body.id, { isActive: false });
    res.json(data)
}

module.exports.active = async(req, res) => {
    let data = await Extracat.findByIdAndUpdate(req.body.id, { isActive: true });
    res.json(data)
}

// Active Deactive

module.exports.ExtracatAdd = async(req, res) => {
    let cetdata = await Category.find({})
    return res.render('AdminPanal/Extracategory/ExtracatAdd', { cetdata: cetdata })
};

module.exports.getsubcategory = async(req, res) => {
    try {
        let subdata = await subcategory.find({ cat_id: req.body.catId });
        // console.log(subdata);
        let option = `<option value=''>Select Subcategory</option>`;
        if (subdata) {
            for (var i = 0; i < subdata.length; i++) {
                option += `<option value='${subdata[i].id}'>${subdata[i].SubcategoryName}</option>`
            }
            return res.json(option)
        }
    } catch (error) {
        console.log(error, "subcategory error");
    }
};

module.exports.Extracatrecord = async(req, res) => {
    try {
        let nDate = new Date().toLocaleString('en-us', {
            timeZone: 'Asia/Calcutta'
        })
        req.body.isActive = true;
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;

        let data = await Extracat.create(req.body)
        if (data) {
            return res.redirect('back')
        } else {
            console.log(err);
        }
    } catch (error) {
        console.log(error, "Extracat insertrecord");
    }
}

module.exports.ExtracatView = async(req, res) => {
    try {
        let data = await Extracat.find({}).populate('cat_id').populate('subcat_id').exec();
        if (data) {
            return res.render('AdminPanal/Extracategory/ExtracatView', { Ecatdata: data })
        }
    } catch (error) {
        console.log(error, "Extracat view");
    }
};

module.exports.delete = async(req, res) => {
    try {
        let data = await Extracat.findByIdAndDelete(req.params.id)
        if (data) {
            return res.redirect('back')
        } else {
            console.log(err);
        }
    } catch (error) {
        console.log(error, "Extracat delete");
    }
};

module.exports.update = async(req, res) => {
    try {
        let cetdata = await Category.find({})
        let subcetdata = await subcategory.find({})
        let data = await Extracat.findById(req.params.id);
        if (data) {
            return res.render('AdminPanal/Extracategory/ExtracatUpdate', {
                data: data,
                cetdata: cetdata,
                subcetdata: subcetdata
            })
        }
    } catch (error) {
        console.log(error, "Extracat update");
    }
};

module.exports.Extracatupdate = async(req, res) => {
    let ecatid = req.body.ecid
    try {
        let data = await Extracat.findByIdAndUpdate(ecatid, req.body)
        if (data) {
            return res.redirect('/Admin/Extracat/ExtracatView')
        }
    } catch (error) {
        console.log(error, "Extra cat update");
    }
};