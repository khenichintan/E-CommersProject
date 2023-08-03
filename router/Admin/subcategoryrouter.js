const express = require('express');

const router = express.Router();

const subcategorycontroller = require('../../controller/Admin/subcategorycontroller');

// active deactive

router.get('/deactive/:id', subcategorycontroller.deactive);

router.get('/active/:id', subcategorycontroller.active);

// active deactive

router.get('/SubcategoryAdd', subcategorycontroller.SubcategoryAdd);

router.post('/subcategoryrecord', subcategorycontroller.subcategoryrecord);

router.get('/SubcategoryView', subcategorycontroller.SubcategoryView);

router.get('/delete/:id', subcategorycontroller.delete);

router.get('/update/:id', subcategorycontroller.update);

router.post('/subcategoryupdate', subcategorycontroller.subcategoryupdate);

module.exports = router;