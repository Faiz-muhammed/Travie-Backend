const express = require("express");
const Router = express.Router();
const {companyRegister,companyLogin,createHotel} =require("../Controllers/companyControl")

Router.post('/companyRegister',companyRegister)
Router.post('/companyLogin',companyLogin)
Router.post('/addhotel',createHotel)


module.exports = Router;