const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    colour: {
        type: String,
        required: true
    },
    images: {
        type: [String]
    }
},

    {  timestamps: true }
)

const productModel = mongoose.model('product', productSchema)
module.exports = productModel;