const express = require('express');

const port = 8006;

const app = express();

const path = require('path');

const stripe = require('stripe')('sk_test_51NVWNnSANGpnD1O3LoMi4fPDa9eZC4UA9S0LlVqKlLmq98i04RElw0k7YOiRVcmDgcvZqCTyLwX4macZYHSQUgy300lHmsSfJn')

// const mongoose = require('mongoose');

// const url = "mongodb + srv: //chintan09:<kheni123>@cluster0.gven7jf.mongodb.net/E-Commerse";

// const connectionParams = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }
// mongoose.connect(url, connectionParams)
//     .then(() => {
//         console.log('Connected to the database ')
//     })
//     .catch((err) => {
//         console.error(`Error connecting to the database. ${err}`);
//     })
const db = require('./config/mongodb');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

const cookieParas = require('cookie-parser');

const passport = require('passport');
const passportLocal = require('./config/passport');
const session = require('express-session');

app.use(cookieParas());

app.use(express.static('userassets'));

app.use(express.static('assets'));

app.use("/upload", express.static(path.join(__dirname, 'upload')));

app.use(express.urlencoded());

app.use(session({
    name: "node",
    secret: "nodecode",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 100 * 60 * 60
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/Admin', require('./router/Admin/adminrouter'));
app.use('/', require('./router/User/Userrouter'));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false
    } else {
        console.log(("Server is running"), port);
    }
})