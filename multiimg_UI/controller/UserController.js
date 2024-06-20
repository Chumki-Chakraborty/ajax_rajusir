const User=require('../model/usermodel')

const getUser=(req,res)=>{
    res.render('addUser')
}
const viewUser=async(req,res)=>{
    try{
        const users=await User.find();
      
        console.log('ss',users);
        if(users){
            res.render('getUser',{
                title:"djcgh",
                data:users
            })
        }


       

    }catch(error){
        console.log(error);
    }
    
}


const createUser=async(req,res)=>{
    try{
        const {name,email}=req.body

        const user= new User({
            name,email
        })
       const g= await user.save()
        //console.log('data',g);
        res.redirect('/getuser')


    }catch(err){
        console.log(err);
    }

}


module.exports={
    getUser,
    createUser,
    viewUser
}