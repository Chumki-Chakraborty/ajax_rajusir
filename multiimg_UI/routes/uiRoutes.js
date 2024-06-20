const express = require('express');
const upload = require('../utilities/productImage');
const { home, addProduct, createProduct, editProduct, updateProduct, deleteProduct } = require('../controller/uiController');

const Router = express.Router()

//routes
Router.get('/', home)
Router.get('/add', addProduct)
Router.post('/create', upload.array('images', 5), createProduct)
Router.get('/edit/:id', editProduct)
Router.post('/update/:id',upload.array('images', 5), updateProduct)
Router.get('/delete/:id', deleteProduct)


module.exports = Router;