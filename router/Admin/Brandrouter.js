const express = require('express');

const router = express.Router();

const Brandcontroller = require('../../controller/Admin/Brandcontroller');

// active deactive

router.get('/deactive/:id', Brandcontroller.deactive);

router.get('/active/:id', Brandcontroller.active);

// active deactive

router.get('/BrandAdd', Brandcontroller.BrandAdd);

// Footer Ajax Request
router.post('/getExtracategory', Brandcontroller.getExtracategory);

router.post('/Brandrecord', Brandcontroller.Brandrecord);

router.get('/BrandView', Brandcontroller.BrandView);

router.get('/delete/:id', Brandcontroller.delete);

router.get('/update/:id', Brandcontroller.update);

router.post('/BrandUpdate', Brandcontroller.Brandupdate);

module.exports = router