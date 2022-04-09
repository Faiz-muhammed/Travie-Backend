const express = require("express");
const Router = express.Router();
const {companyRegister,companyLogin} =require("../Controllers/companyControl")

Router.post('/companyRegister',companyRegister)
Router.post('/companyLogin',companyLogin)


module.exports = Router;