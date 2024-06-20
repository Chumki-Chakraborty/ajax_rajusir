const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    model_year:[]
    
    
})

const StudentModel = new mongoose.model('vehicle', StudentSchema)

module.exports = StudentModel