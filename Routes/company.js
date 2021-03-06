const express = require("express");
const Router = express.Router();
const {companyRegister,companyLogin,createHotel,getAllHotels,getHotelsOfCompany} =require("../Controllers/companyControl")

Router.post('/companyRegister',companyRegister)
Router.post('/companyLogin',companyLogin)
Router.post('/addhotel',createHotel)
Router.get('/hotels',getAllHotels)
Router.get('/companyhotels',getHotelsOfCompany)

module.exports = Router;