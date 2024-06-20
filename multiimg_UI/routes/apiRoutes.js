const express = require('express')
const { create, getProduct, editProduct, updateProduct, deleteProduct } = require('../controller/apiController')
const upload = require('../utilities/productImage')

const Router = express.Router()

// routes
Router.post('/create', upload.array('images', 5), create)
Router.get('/get', getProduct)
Router.get('/edit/:id', editProduct)
Router.put('/update/:id', upload.array('images', 5), updateProduct)
Router.delete('/delete/:id', deleteProduct)

module.exports = Router;