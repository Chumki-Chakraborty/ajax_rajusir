const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const yserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
   
},

    {  timestamps: true }
)

const userModel = mongoose.model('user', yserSchema)
module.exports = userModel;