const express = require("express");
const Router = express.Router();
const {userSignUp,userLogin} = require("../Controllers/userControl")

Router.post('/userSignUp',userSignUp)
Router.post('/userLogin',userLogin)
module.exports = Router;