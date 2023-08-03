const express = require('express');

const router = express.Router();

const admin = require('../../model/Admin/adminmodel')

const admincontroller = require('../../controller/Admin/admincontroller');

const passport = require('passport');

// login-out
router.get('/', admincontroller.login);

router.post('/chacklogin', passport.authenticate('local', ({ failureMessage: '/Admin' })), admincontroller.chacklogin);

router.get('/Logout', passport.chaeckAuthenticatedUser, admincontroller.logout)

// login-out

// forget password

router.get('/chackemail', admincontroller.chackemail);

router.post('/emailchack', admincontroller.emailchack);

router.get('/chackotp', admincontroller.chackotp);

router.post('/otpchack', admincontroller.otpchack);

router.get('/chackpassword', admincontroller.chackpassword);

router.post('/confirmpass', admincontroller.confirmpass);

// forget password

// active deactive

router.get('/deactive/:id', admincontroller.deactive);

router.get('/active/:id', admincontroller.active);

// active deactive

router.get('/dashboard', passport.chaeckAuthenticatedUser, admincontroller.dashboard);

router.get('/AdminAdd', passport.chaeckAuthenticatedUser, admincontroller.AdminAdd);

router.get('/AdminView', passport.chaeckAuthenticatedUser, admincontroller.AdminView);

router.post('/insertrecord', passport.chaeckAuthenticatedUser, admin.uploadavatar, admincontroller.insertrecord);

router.get('/delete/:id', passport.chaeckAuthenticatedUser, admincontroller.delete);

router.get('/update/:id', passport.chaeckAuthenticatedUser, admincontroller.update);

router.post('/adminupdaterecord', passport.chaeckAuthenticatedUser, admin.uploadavatar, admincontroller.adminupdaterecord)

// other router

router.use('/category', require('./Categoryrouter'));

router.use('/subcategory', require('./subcategoryrouter'));

router.use('/Extracat', require('./Extracatrouter'));

router.use('/Brand', require('./Brandrouter'));

router.use('/Type', require('./Typerouter'));

router.use('/Product', require('./Productrouter'));

module.exports = router;