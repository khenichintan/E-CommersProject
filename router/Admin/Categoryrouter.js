const express = require('express');

const router = express.Router();

const category = require('../../model/Admin/Categorymodel')

const categorycontroller = require('../../controller/Admin/CategoryController');

// active deactive

router.get('/deactive/:id', categorycontroller.deactive);

router.get('/active/:id', categorycontroller.active);

// active deactive

router.get('/CategoryAdd', categorycontroller.CategoryAdd);

router.post('/categoryrecord', category.uploadavatar, categorycontroller.categoryrecord);

router.get('/CategoryView', categorycontroller.CategoryView);

router.get('/delete/:id', categorycontroller.delete);

router.get('/update/:id', categorycontroller.update);

router.post('/categoryupdate', category.uploadavatar, categorycontroller.categoryupdate)

module.exports = router;