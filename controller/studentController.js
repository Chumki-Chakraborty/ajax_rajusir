const StudentModel = require('../model/studentModel');
const StoreModel = require('../model/store')
const flash = require('connect-flash')

exports.index = (req, res) => {
    StudentModel.find((error, data) => {
        if (!error) {

            res.render('student-display', {
                title: 'Student Display',
                message: req.flash('message'),
                displayData: data
            },

            );
        }
    })
}

//****for paginate */
exports.getalldata = async (req, res) => {
    try {
        const gdata = await StudentModel.aggregate(
            [
                { $project: { __v: 0 } }
            ]
        )
        let options = {
            page: 1,
            limit: 5
        }
        let allRecord = await StudentModel.aggregatePaginate(gdata, options);
        console.log('kk', allRecord);
        res.status(200).json({
            allRecord
        })

    } catch (error) {
        console.log(error);
    }

}

//**addfileds */
exports.addfiled = async (req, res) => {
    try {
        const gdata = await StudentModel.aggregate(
            [
                { $project: { __v: 0 } },
               { $addFields: { "address.city": "bolpur" } },
               { $skip: 5 }
            ]
        )
        console.log('kk', gdata);
        res.status(200).json({
            count: gdata.length,
            gdata,

        })

    } catch (error) {
        console.log(error);
    }

}

//**** reat limit */
exports.addlimit = async (req, res) => {
    try {
        const gdata = await StudentModel.find()

        //console.log('kk',gdata);
        res.status(200).json({
            count: gdata.length,
            gdata,

        })

    } catch (error) {
        console.log(error);
    }

}

//replace root

exports.replaceRoot = async (req, res) => {
    try {
        const gdataa = await StudentModel.aggregate(
            [


                {
                    $replaceRoot: {
                        newRoot: {
                            full_name: {
                                $concat: ["$firstName", " ", "$lastName"]
                            }
                        }
                    }
                }
            ]
        )
        console.log('kk', gdataa);
        res.status(200).json({
            count: gdataa.length,
            gdataa,

        })

    } catch (error) {
        console.log(error);
    }

}


//*****add geo location***//
exports.geoNear = async (req, res) => {
    try {
        const addStoreData = new StoreModel({
            store_name: req.body.store_name,
            store_category: req.body.store_category,
            location: {
                type: "Point",
                coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)]
            }
        })
        const getGeoData = await addStoreData.save()

        res.status(200).json({
            getGeoData,
        })

    } catch (error) {
        console.log(error);
    }

}












exports.registration = (req, res) => {
    res.render("student-reg", {
        title: "Student Registration"
    });
}

exports.registerStudent = (req, res) => {
    const Student = new StudentModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        contact: req.body.contactNumber,
        email: req.body.email,
        course: req.body.course,
        fees: req.body.fees,
    })
    Student.save().then((result) => {
        console.log(result, "Student Registration Successfull!!!");
        req.flash('message', 'Added Product Successfully')
        res.redirect('/');
    }).catch((error) => {
        console.log(error);

        res.redirect('/student-reg');
    })
}

exports.update = (req, res) => {
    StudentModel.findById(req.params.id, (error, data) => {
        if (!error) {
            res.render('edit-students', {
                title: "Edit Student",
                displayData: data
            })
        } else {
            res.render('/');
        }
    })
}

exports.updateStudent = (req, res) => {
    StudentModel.findByIdAndUpdate(req.params.id, { firstName: req.body.firstName, lastName: req.body.lastName, address: req.body.address, contact: req.body.contactNumber, email: req.body.email, course: req.body.course, fees: req.body.fees }, (error, data) => {
        if (!error) {
            console.log("Student Update");
            res.redirect('/');
        } else {
            console.log(error);
        }
    });
}

/* Hard Delete */

// exports.delete = (req, res) => {
//     StudentModel.findByIdAndRemove(req.params.id, (error, data) => {
//         if (!error) {
//             res.redirect('/');
//         } else {
//             console.log(error);
//             res.redirect('/');
//         }
//     })
// }

/* Soft Delete */

exports.delete = (req, res) => {
    StudentModel.findByIdAndUpdate(req.params.id, { status: 0 }, (error, data) => {
        if (!error) {
            res.redirect('/');
        } else {
            console.log(error);
            res.redirect('/');
        }
    })
}