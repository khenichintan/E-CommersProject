const admin = require('../../model/Admin/adminmodel')

const path = require('path');

const fs = require('fs');

const nodemailer = require('nodemailer');

//login-logout

module.exports.login = async(req, res) => {
    try {
        if (req.isAuthenticated()) {
            res.redirect('/AdminPanal/dashboard');
        } else {
            return res.render('AdminPanal/login')
        }
    } catch (error) {
        console.log(error, "login error");
    }
};

module.exports.chacklogin = async(req, res) => {
    try {
        return res.redirect('/Admin/dashboard');
    } catch (error) {
        console.log(error, "chack login");
    }
};

module.exports.logout = async(req, res) => {
    try {
        req.logout((err) => {
            if (err) {
                console.log(err);
            } else {
                return res.redirect('/Admin')
            }
        });
    } catch (error) {
        console.log(error, "logout error");
    }
}

//login-logout

// forget password
module.exports.chackemail = async(req, res) => {
    try {
        return res.render('AdminPanal/chackemail');
    } catch (error) {
        console.log(error, "chack email");
    }
};

module.exports.emailchack = async(req, res) => {
    try {
        let admindata = await admin.findOne({ email: req.body.email })
        if (admindata) {
            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "83ae438ef8a395",
                    pass: "0269d879392cb6"
                }
            });

            let otp = Math.round(Math.random() * 1000000);
            res.cookie('otp', otp);
            res.cookie('email', req.body.email);

            let info = await transport.sendMail({
                from: "chintan@gmail.com", // sender address
                to: "kheni@gmail.com", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: `Your Otp is ${otp}`, // html body
            });

            return res.redirect('/AdminPanal/chackotp')
        } else {
            return res.redirect('back')
        }
    } catch (error) {
        console.log(error, "email chack");
    }
};

module.exports.chackotp = async(req, res) => {
    try {
        return res.render('AdminPanal/chackotp')
    } catch (error) {
        console.log(error, "chack otp");
    }
};

module.exports.otpchack = async(req, res) => {
    try {
        if (req.body.otp == req.cookies.otp) {
            return res.redirect('/AdminPanal/chackpassword');
        }
    } catch (error) {
        console.log(error, "chack otp");
    }
};

module.exports.chackpassword = async(req, res) => {
    try {
        return res.render('AdminPanal/chackpassword')
    } catch (error) {
        console.log(error, "chackpassword error");
    }
};

module.exports.confirmpass = async(req, res) => {
    try {
        if (req.body.npass === req.body.cpass) {
            let email = req.cookies.email;
            let admindata = await admin.findOne({ email: email });
            if (admindata) {
                await admin.findByIdAndUpdate(admindata.id, { password: req.body.npass });
                return res.redirect('/Admin')
            }
        } else {
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error, "confirmpass error");
    }
}

// forget password

// Active Deactive

module.exports.deactive = async(req, res) => {
    let data = await admin.findByIdAndUpdate(req.params.id, { isActive: false })
        // console.log(req.params.id)
    return res.redirect('back')
}

module.exports.active = async(req, res) => {
    let data = await admin.findByIdAndUpdate(req.params.id, { isActive: true })
    return res.redirect('back')
        // console.log(req.params.id)
}

// Active Deactive

module.exports.dashboard = async(req, res) => {
    return res.render('AdminPanal/dashboard');
};

module.exports.AdminAdd = async(req, res) => {
    return res.render('AdminPanal/Admin/AdminAdd')
};

module.exports.insertrecord = async(req, res) => {
    try {

        req.body.role = 'Admin';

        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
        });

        var singleimage = '';

        if (req.file) {
            singleimage = admin.avatarpath + "/" + req.file.filename;
        };

        req.body.image = singleimage;

        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;
        req.body.name = req.body.first_name + " " + req.body.second_name;

        let data = await admin.create(req.body)
        if (data) {
            return res.redirect('back')
        } else {
            console.log(err)
        }
    } catch (error) {
        console.log(error, "admin add");
    }
};

module.exports.AdminView = async(req, res) => {
    try {

        // if (req.query.status == 'deActive') {
        //     let Active = await admin.findByIdAndUpdate(req.query.id, { isActive: false });
        // }
        // if (req.query.status == 'Active') {
        //     let Active = await admin.findByIdAndUpdate(req.query.id, { isActive: true });
        // }

        var page = req.query.page;

        let data = await admin.find({})
        if (data) {
            return res.render('AdminPanal/Admin/AdminView', {
                'admindata': data,
                cpage: page
            })
        } else {
            console.log("admin veiw", error);
        }
    } catch (error) {
        console.log(error, "admin view");
    }
};

module.exports.delete = async(req, res) => {
    try {
        let record = await admin.findById(req.params.id)
        if (record) {
            var imagepath = path.join(__dirname, '../../', record.image);
            if (imagepath) {
                fs.unlinkSync(imagepath)
            }
        }
        let data = await admin.findByIdAndDelete(req.params.id)
        if (data) {
            return res.redirect('back')
        }
    } catch (error) {
        console.log(error, "admin delete");
    }
};

module.exports.update = async(req, res) => {
    try {
        let data = await admin.findById(req.params.id)
        if (data) {
            return res.render('AdminPanal/Admin/Adminupdate', {
                data: data
            })
        }
    } catch (error) {
        console.log(error, "update error")
    }
};

module.exports.adminupdaterecord = async(req, res) => {
    let adminid = req.body.adid;
    try {
        if (req.file) {
            let data = await admin.findById(adminid)
            if (data) {
                var imagepath = path.join(__dirname, '../../', data.image)
                if (imagepath) {
                    fs.unlinkSync(imagepath)
                }

                var newpath = admin.avatarpath + "/" + req.file.filename;
                req.body.image = newpath

                const uDate = new Date().toLocaleString('en-US', {
                    timeZone: 'Asia/Calcutta'
                });

                req.body.updatedAt = uDate;

                let record = await admin.findByIdAndUpdate(adminid, req.body)
                if (record) {
                    return res.redirect('/Admin/AdminView')
                } else {
                    console.log('data not updated (if) ');
                }
            }
        } else {
            let data = await admin.findById(adminid)
            if (data) {
                req.body.image = data.image;

                const uDate = new Date().toLocaleString('en-US', {
                    timeZone: 'Asia/Calcutta'
                });

                req.body.updatedAt = uDate;

                let record = await admin.findByIdAndUpdate(adminid, req.body)
                if (record) {
                    return res.redirect('/Admin/AdminView')
                } else {
                    console.log('data not updated (else) ');
                }
            } else {
                console.log("update data not found in (else)");
            }
        }
    } catch (error) {
        console.log(error, "Admin Update");
    }
}