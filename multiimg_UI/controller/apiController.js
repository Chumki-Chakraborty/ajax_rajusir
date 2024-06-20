const productModel = require('../model/productModel')
const path = require('path')
const { Validator }  = require('node-input-validator');

//create
const create = async (req, res) => {
    try {
        console.log(req.files);
        const { name, description, size, price, colour } = req.body;
        const validation = new Validator(req.body, {
            name: 'minLength:5',
            price: 'required'
        });
        const matched = await validation.check()
        if (!matched) {
           return res.status(422).json({status: false, message:'validation failed', error: validation.errors})
        }
        const images = req.files.map(file => file.path)
        const product = new productModel({ name, description, size, price, colour, images })
        const createdProduct = await product.save();
        return res.status(201).json({ status: true, message: 'Product created', createdProduct })
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message })
    }
}

//get product
const getProduct = async (req,res) => {
    try {
        const getProduct = await productModel.find();
        res.status(200).json({ status: true, allproducts: getProduct })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message })
    }
}

//edit product
const editProduct = async (req,res) => {
    try {
        const editProduct = await productModel.findById(req.params.id);
        res.status(200).json({ status: true, editdata: editProduct })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message })
    }
}

//update api
const updateProduct = async (req, res) => {
    try {
        const { name, description, size, price, colour } = req.body;
        const validation = new Validator(req.body, {
            name: 'minLength:5',
            price: 'required'
        });
        const matched = await validation.check()
        if (!matched) {
           return res.status(422).json({status: false, message:'validation failed', error: validation.errors})
        }
        const images = req.files.map(file => file.path)
        const updatedFields = {name, description, size, price, colour, images}
        const updated = await productModel.findByIdAndUpdate(req.params.id, updatedFields, { new: true })
        return res.status(200).json({success: true, message: 'Product updated successfully', data: updated})
    } catch (error) {
        console.log(error);
        return res.status(400).json({success: false, message: error.message})
    }
}

//delete api
const deleteProduct = async (req, res) => {
    try {
        const deleteData = await productModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({status:true, message: 'Product Deleted', deleted_data: deleteData})
    } catch (error) {
        console.log(error);
        return res.status(400).json({status:false, message:error.message})
    }
}

module.exports = {
    create, getProduct, editProduct, updateProduct, deleteProduct
}