const express = require('express');

const router = express.Router();

const Extracatcontroller = require('../../controller/Admin/Extracatcontroller');

// active deactive

router.post('/deactive', Extracatcontroller.deactive);

router.post('/active', Extracatcontroller.active);

// active deactive

router.get('/ExtracatAdd', Extracatcontroller.ExtracatAdd);

// Footer Ajax Request
router.post('/getsubcategory', Extracatcontroller.getsubcategory);

router.post('/Extracatrecord', Extracatcontroller.Extracatrecord);

router.get('/ExtracatView', Extracatcontroller.ExtracatView);

router.get('/delete/:id', Extracatcontroller.delete);

router.get('/update/:id', Extracatcontroller.update);

router.post('/Extracatupdate', Extracatcontroller.Extracatupdate);

module.exports = router