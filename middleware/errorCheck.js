const StudentModel = require("../model/studentModel");

exports.checkDuplicateEntries = (req, res, next) => {
    StudentModel.findOne({
        userName: req.body.firstName
    }).exec((err, user) => {
        if (err) {
            console.log(err);
            return;
        }
        if (user) {
            req.flash("message", "firstName Already Exists");
            return res.redirect("/");
            // console.log("Username Already Exists");
            // return;
        }
        StudentModel.findOne({
            email: req.body.email
        }).exec((err, email) => {
            if (err) {
                console.log(err);
                return;
            }
            if (email) {
                req.flash("message", "Email Already Exists");
                return res.redirect("/");

                // console.log("Email already exist...");
                // return;
            }
            // next();
            const password = req.body.password;
            const confirm = req.body.confirmpassword;
            if (password !== confirm) {
                req.flash("message", "Password & Confirm Password Are Not Matched");
                return res.redirect("/");
            }
            next();
        })
    })
}