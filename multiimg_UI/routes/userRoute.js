const express=require('express')
const { getUser, createUser, viewUser } = require('../controller/UserController')

const Router=express.Router()

Router.get('/user',getUser)
Router.get('/getuser',viewUser)
Router.post('/user/create',createUser)




module.exports=Router