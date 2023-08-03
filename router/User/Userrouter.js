const express = require('express');

const router = express.Router();

const Usercontroller = require('../../controller/User/Usercontroller');

const passport = require('passport');

router.get('/', Usercontroller.dashboard);

router.get('/Product/:cat/:sub/:ex', Usercontroller.Product);

router.get('/SingleView/:id', Usercontroller.SingleView);

// add cart

router.get('/Cart', passport.chaeckUserAuthenticated, Usercontroller.Cart);

router.post('/AddCart', Usercontroller.AddCart);

router.post('/change_quantity', Usercontroller.change_quantity);

router.get('/delete/:id', Usercontroller.delete);

// add cart

// ChachOut

router.get('/Chackout', Usercontroller.Chackout);

router.post('/chackoutrecord', Usercontroller.chackoutrecord);

// ChachOut

router.post('/UserRegister', Usercontroller.UserRegister);

router.post('/UserLogin', passport.authenticate('user', ({ failureMessage: '/' })), Usercontroller.UserLogin);

router.get('/logout', Usercontroller.logout);

module.exports = router;