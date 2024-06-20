const path=require('path')
const multer=require('multer')

var storage=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'uploads/')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname.split('.').pop())
    }
})
const uploadImage = multer({
     storage: storage,
     fileFilter:function(req,file,callback){
        if(
            file.mimetype =='image/png'||
            file.mimetype =='image/jpg' ||
            file.mimetype == 'image/jpeg' ||
            file.mimetype == 'image/webp'
            ){
                callback(null,true)

        }else{
            console.log('select valid image format');
            callback(null,false)
        }
     },
     limits:{
        fieldSize: 1024 * 1024 * 20
     }
     });


     module.exports=uploadImage