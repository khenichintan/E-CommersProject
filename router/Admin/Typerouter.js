const express = require('express');

const router = express.Router();

const Typecontroller = require('../../controller/Admin/Typecontroller');

// active deactive

router.get('/deactive/:id', Typecontroller.deactive);

router.get('/active/:id', Typecontroller.active);

// active deactive

router.get('/TypeAdd', Typecontroller.TypeAdd);

// Footer Ajax Request
router.post('/getExtracategory', Typecontroller.getExtracategory);

router.post('/Typerecord', Typecontroller.Typerecord);

router.get('/TypeView', Typecontroller.TypeView);

router.get('/delete/:id', Typecontroller.delete);

router.get('/update/:id', Typecontroller.update);

router.post('/Typeupdate', Typecontroller.Typeupdate);

module.exports = router