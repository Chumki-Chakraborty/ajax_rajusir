const mongoose=require('mongoose');

const storeSchema= mongoose.Schema({  
    store_name:{
       type:String,
       required:true 
    },
    store_category:{
       type:String,
       required:true 
    },
    location:{
       type:{type:String,required:true},
       coordinates:[] 
    },

   
});

storeSchema.index({location:"2dsphere"});

module.exports= mongoose.model('store',storeSchema);