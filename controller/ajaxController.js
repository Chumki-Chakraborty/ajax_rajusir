const UserModel = require('../model/ajaxModel')


class AjaxController {


    createUser = async (req, res) => {
        res.render('user', {
            title: "hshhs"
        })


    }

    //for crate user
    createUserData = async (req, res) => {
        //console.log(req.body);
        try {

            let personInfo = req.body; //Get the parsed information  

            let newPerson = new UserModel({

                username: personInfo.username,
                fullname: personInfo.fullname,
                age: personInfo.age
            });

            const redata = await newPerson.save()

            res.json({ Success: '1', message: "data added", data: redata });
            console.log(redata, 'data added');
        } catch (error) {
            console.log(error);
        }


    }


    showUserData = async (req, res) => {
        try {
            const showdata = await UserModel.find()
            res.json({
                success: 1,
                message: "get all data",
                data: showdata
            })

        } catch (error) {
            console.log(error);
        }

    }



    deleteUserData = async (req, res) => {
        try {
            let id = req.params.id;
            await UserModel.findOneAndRemove(id);
            res.json({ message: "delete Successfully" });

        } catch (error) {
            console.log(error);
        }

    }


    editUserData=async(req,res)=>{

        try {
            const studentOne = await UserModel.findById(req.params.id);
            res.status(200).json({
                message:"single dtaa",
                data:studentOne
            });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }

    }


    updateUserData = async (req, res) => {
        try {
            let id = req.params.id;
            let personInfo = req.body;

           await UserModel.update({id: id }, {
                username: personInfo.username,
                fullname: personInfo.fullname,
                age: personInfo.age
            })
            res.json({ message: "update Successfully" });

        } catch (error) {
            console.log(error);
        }
    }


    UserData=(req,res)=>{
        res.render('validate',{
            title:"validate"
        })
    }


}



module.exports = new AjaxController()