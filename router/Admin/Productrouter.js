const express = require('express');

const router = express.Router();

const Product = require('../../model/Admin/Productmodel')

const Productcontroller = require('../../controller/Admin/Productcontroller');

// active deactive

router.get('/deactive/:id', Productcontroller.deactive);

router.get('/active/:id', Productcontroller.active);

// active deactive

router.get('/ProductAdd', Productcontroller.ProductAdd);

// Footer Ajax Request
router.post('/getBrandType', Productcontroller.getBrandType);

router.post('/Productrecord', Product.uploadimage, Productcontroller.Productrecord);

router.get('/ProductView', Productcontroller.ProductView);

router.get('/Update/:id', Productcontroller.Update);

router.post('/ProductUpdate', Product.uploadimage, Productcontroller.ProductUpdate);

module.exports = router;