const passport = require('passport');

const passportLocal = require('passport-local').Strategy;

const admin = require('../model/Admin/adminmodel');

const User = require('../model/User/Usermodel');

passport.use(new passportLocal({
    usernameField: "email"
}, async function(email, password, done) {
    let admindata = await admin.findOne({ email: email });
    if (admindata) {
        if (admindata.password === password) {
            return done(null, admindata)
        } else {
            return done(null, false)
        }
    } else {
        return done(null, false)
    }
}));

passport.use("user", new passportLocal({
    usernameField: "email"
}, async function(email, password, done) {
    let userdata = await User.findOne({ email: email });
    // console.log(userdata);
    if (userdata) {
        if (userdata.password === password) {
            return done(null, userdata)
        } else {
            return done(null, false)
        }
    } else {
        return done(null, false)
    }
}));

passport.serializeUser(async function(user, done) {
    return done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    let AD = await admin.findById(id);
    if (AD) {
        return done(null, AD)
    } else {
        let Usre = await User.findById(id);
        if (Usre) {
            done(null, Usre);
        } else {
            return done(null, false)
        }
    }
});

passport.chaeckAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.role == 'Admin') {
            next();
        } else {
            res.redirect('/Admin')
        }
    } else {
        return res.redirect('/Admin')
    }
};

passport.chaeckUserAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        // console.log(req.user);
        if (req.user.role == 'User') {
            next();
        } else {
            res.redirect('/')
        }
    } else {
        return res.redirect('/')
    }
};

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.role == 'Admin') {
            res.locals.admins = req.user;
        } else {
            res.locals.user = req.user;
        }
    }
    next();
};

module.exports = passport;