const mongoose = require("mongoose");
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    fees: {
        type: Number,
        required: true
    },
    status: {
        type: Number, //default
        default: 1
    }
})
StudentSchema.plugin(mongooseAggregatePaginate);
const StudentModel = new mongoose.model('student', StudentSchema)

module.exports = StudentModel