const productModel = require('../model/productModel')
const path = require('path')
const flash = require('connect-flash');
const fs = require('fs')

// Home Page - Display all users
const home = async (req, res) => {
  try {
    const products = await productModel.find();
   
    const productsWithLast4Digits = products.map(product => ({
      ...product._doc,
      last4Digits: product._id.toString().slice(-4)
    }));
    res.render('home', {
      title: "HOME PAGE",
      data: productsWithLast4Digits,
      expressFlash: req.flash('success'),
      flashMsg: req.flash('succes'),
      deleteFlash: req.flash('deleted')
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

// Add User Page - Display form to add a new user
const addProduct = async (req, res) => {
  res.render('add_product', { title: "ADD PRODUCT PAGE" });
};

// Create User - Handle form submission to create a new user
const createProduct = async (req, res) => {
  try {
    const { name, description, size, price, colour } = req.body;
    const images = req.files.map(file => file.path)
    const newProduct = new productModel({name, description, size, price, colour, images})
    await newProduct.save();
    if (newProduct) {
      req.flash('success', 'Product Added Successfully');
      res.redirect('/');
    } else {
      res.redirect('/add');
    }
   

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

// Edit User Page - Display form to edit a specific user
const editProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.render('update_product', { title: "UPDATE PAGE", product });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
}

// Update User - Handle form submission to update a specific user
const updateProduct = async (req, res) => {
  try {
    const { name, description, size, price, colour } = req.body;
    const images = req.files.map(file => file.path)
    // Retrieve existing product including its images
    const existingProduct = await productModel.findById(req.params.id);
    
    // Delete existing images
    if (existingProduct.images && existingProduct.images.length > 0) {
      for (const image of existingProduct.images) {
        // Check if image exists
        if (fs.existsSync(image)) {
          fs.unlinkSync(image); 
        }
      }
    }
    const updatedFields = { name, description, size, price, colour, images }
    const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, updatedFields, {new:true});
    if (updatedProduct) {
      req.flash('succes', 'Product updated')
      res.redirect('/');
    } else {
      res.redirect(`/edit/${req.params.id}`)
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
}

// Delete User - Delete a specific user
const deleteProduct = async (req, res) => {
  try {
    const deletedItem = await productModel.findByIdAndDelete(req.params.id);
    if (deletedItem) {
      // Delete existing images if they exist
      if (deletedItem.images && deletedItem.images.length > 0) {
        for (const image of deletedItem.images) {
          //check if image exists
          if (fs.existsSync(image)) {
            fs.unlinkSync(image); 
          }
        }
      }
      req.flash('deleted', 'Item deleted')
    }
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};



module.exports = {
  home, addProduct, createProduct, editProduct, updateProduct, deleteProduct
}
