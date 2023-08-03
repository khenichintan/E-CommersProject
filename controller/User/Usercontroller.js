// Login - Register

const Category = require('../../model/Admin/Categorymodel');

const subcategory = require('../../model/Admin/subcategorymodel');

const Extracat = require('../../model/Admin/Extracatmodel');

const Brand = require('../../model/Admin/Brandmodel');

const Type = require('../../model/Admin/Typemodel');

const Product = require('../../model/Admin/Productmodel');

const User = require('../../model/User/Usermodel');

const Cart = require('../../model/User/Cartmodel');

const Chackout = require('../../model/User/Chackoutmodel');

module.exports.dashboard = async(req, res) => {
    try {
        const categorydata = await Category.find({});
        const subcatdata = await subcategory.find({});
        const Extracatdata = await Extracat.find({});

        var CartCount = 0;
        if (req.user) {
            CartCount = await Cart.find({ user_id: req.user.id }).countDocuments();
        }
        return res.render('UserPanal/Dashboard', {
            categorydata: categorydata,
            subcatdata: subcatdata,
            Extracatdata: Extracatdata,
            CartCount: CartCount
        })
    } catch (error) {
        console.log(error, "User Pana Dashoadra View Error");
    }
};

module.exports.Product = async(req, res) => {
    try {
        const categorydata = await Category.find({});
        const subcatdata = await subcategory.find({});
        const Extracatdata = await Extracat.find({});

        var CartCount = 0;
        if (req.user) {
            CartCount = await Cart.find({ user_id: req.user.id }).countDocuments();
        }

        let productdata = await Product.find({ cat_id: req.params.cat, subcat_id: req.params.sub, Extracat_id: req.params.ex });
        if (productdata) {
            return res.render('UserPanal/Product', {
                categorydata: categorydata,
                subcatdata: subcatdata,
                Extracatdata: Extracatdata,
                productdata: productdata,
                CartCount: CartCount
            });
        }
    } catch (err) {
        console.log('product page load err in user : ', err);
    }
}

module.exports.SingleView = async(req, res) => {
    try {
        const categorydata = await Category.find({});
        const subcatdata = await subcategory.find({});
        const Extracatdata = await Extracat.find({});

        var CartCount = 0;
        if (req.user) {
            CartCount = await Cart.find({ user_id: req.user.id }).countDocuments();
        }

        let singleView = await Product.findById(req.params.id);

        // console.log(singleView);
        return res.render('UserPanal/SingleView', {
            singleView,
            categorydata: categorydata,
            subcatdata: subcatdata,
            Extracatdata: Extracatdata,
            CartCount: CartCount
        })

    } catch (error) {
        console.log(error, "single product view");
    }
};

// Add Cart

module.exports.AddCart = async(req, res) => {
    try {
        // console.log(req.body);
        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
        });

        let check = await Cart.find({ Product_id: req.body.Product_id, user_id: req.user.id });
        if (check.length < 1) {
            req.body.user_id = req.user.id;
            req.body.active = true;
            req.body.createAt = nDate;
            req.body.updateAt = nDate;

            let data = await Cart.create(req.body);
            if (data) {
                res.redirect('back');
            }
        }
    } catch (err) {
        console.log('add to cart err in user : ', err);
    }
}

module.exports.Cart = async(req, res) => {
    try {
        const categorydata = await Category.find({});
        const subcatdata = await subcategory.find({});
        const Extracatdata = await Extracat.find({});

        var CartCount = 0;
        if (req.user) {
            CartCount = await Cart.find({ user_id: req.user.id }).countDocuments();
        };

        const cartdata = await Cart.find({ user_id: req.user.id }).populate('Product_id').exec();
        // const cartdata = await Cart.find(req.params.id).populate('Product_id').exec();
        return res.render('UserPanal/Cart', {
            categorydata: categorydata,
            subcatdata: subcatdata,
            Extracatdata: Extracatdata,
            cartdata: cartdata,
            CartCount: CartCount
        })
    } catch (error) {
        console.log(error, "cart error");
    }
};

module.exports.change_quantity = async(req, res) => {
    try {
        let update = await Cart.findByIdAndUpdate(req.body.id, { quantity: req.body.quantity });
        if (update) {
            return res.json({ status: 200, msg: "quantity is changed " });
        }
    } catch (err) {
        console.log('add quantity err in cart : ', err);
    }
};

module.exports.delete = async(req, res) => {
    try {
        let data = await Cart.findByIdAndDelete(req.params.id);
        if (data) {
            res.redirect('back');
        }
    } catch (err) {
        console.log('cart product delete err : ', err);
    }
};

module.exports.Chackout = async(req, res) => {
    try {
        const categorydata = await Category.find({});
        const subcatdata = await subcategory.find({});
        const Extracatdata = await Extracat.find({});
        const CartData = await Cart.find({ user_id: req.user.id }).populate('Product_id').exec();

        var CartCount = 0;
        if (req.user) {
            CartCount = await Cart.find({ user_id: req.user.id }).countDocuments();
        };

        return res.render('UserPanal/Chackout', {
            categorydata: categorydata,
            subcatdata: subcatdata,
            Extracatdata: Extracatdata,
            CartData: CartData,
            CartCount: CartCount
        })
    } catch (error) {

    }
};

module.exports.chackoutrecord = async(req, res) => {
    try {

        let nDate = new Date().toLocaleString('en-us', {
            timeZone: 'Asia/Calcutta'
        })

        req.body.isActive = true;
        req.body.createAt = nDate;
        req.body.updateAt = nDate;
        req.body.user_id = req.user.id;

        req.body.name = req.body.first_name + " " + req.body.second_name;

        let userdata = await Chackout.create(req.body);
        if (userdata) {
            return res.redirect('back')
        }
    } catch (error) {
        console.log(error, "address add error");
    }
}

module.exports.UserRegister = async(req, res) => {
    try {
        req.body.role = 'User';

        let nDate = new Date().toLocaleString('en-us', {
            timeZone: 'Asia/Calcutta'
        })

        req.body.isActive = true;
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;

        let userdata = await User.create(req.body);
        if (userdata) {
            return res.redirect('/')
        }
    } catch (error) {
        console.log(error, "user register Error");
    }
};

module.exports.UserLogin = async(req, res) => {
    try {
        return res.redirect('back')
    } catch (error) {
        console.log(error, "user login error", error);
    }
};

module.exports.logout = async(req, res) => {
    try {
        req.logout((err) => {
            if (err) {
                console.log(err);
            } else {
                return res.redirect('/')
            }
        });
    } catch (error) {
        console.log(error, "logout error");
    }
}