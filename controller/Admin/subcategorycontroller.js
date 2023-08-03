const Category = require('../../model/Admin/Categorymodel');

const subcategory = require('../../model/Admin/subcategorymodel');

// Active Deactive

module.exports.deactive = async(req, res) => {
    let data = await subcategory.findByIdAndUpdate(req.params.id, { isActive: false })
    return res.redirect('back')
}

module.exports.active = async(req, res) => {
    let data = await subcategory.findByIdAndUpdate(req.params.id, { isActive: true })
    return res.redirect('back')
}

// Active Deactive

module.exports.SubcategoryAdd = async(req, res) => {
    try {
        let cetdata = await Category.find({})
        return res.render('AdminPanal/Subcategory/SubcategoryAdd', { cetdata: cetdata });
    } catch (error) {
        console.log(error, "sub category");
    }
};

module.exports.subcategoryrecord = async(req, res) => {
    try {
        let nDate = new Date().toLocaleString('en-us', {
            timeZone: 'Asia/Calcutta'
        })

        req.body.isActive = true;
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;

        let data = await subcategory.create(req.body)
        if (data) {
            return res.redirect('back')
        } else {
            console.log(err);
        }
    } catch (error) {
        console.log(error, "subcategoryrecord Add");
    }
};

module.exports.SubcategoryView = async(req, res) => {
    try {
        let data = await subcategory.find({}).populate('cat_id').exec();
        if (data) {
            return res.render('AdminPanal/Subcategory/SubcategoryView', {
                subdata: data
            })
        }
    } catch (error) {
        console.log(error, "Sub category Viwe");
    }
};

module.exports.delete = async(req, res) => {
    try {
        let data = await subcategory.findByIdAndDelete(req.params.id)
        if (data) {
            return res.redirect('back')
        }
    } catch (error) {
        console.log(error, "delete subCategory");
    }
};

module.exports.update = async(req, res) => {
    try {
        let cetdata = await Category.find({})
        let data = await subcategory.findById(req.params.id)
        if (data) {
            return res.render('AdminPanal/Subcategory/SubcategoryUpdate', {
                cetdata: cetdata,
                data: data
            })
        }
    } catch (error) {
        console.log(error, "sub category update");
    }
};

module.exports.subcategoryupdate = async(req, res) => {
    let subcatid = req.body.sbid;
    try {
        let data = await subcategory.findByIdAndUpdate(subcatid, req.body)
        if (data) {
            return res.redirect('/Admin/Subcategory/SubcategoryView')
        }
    } catch (error) {
        console.log(error, "Subcat Update");
    }
}