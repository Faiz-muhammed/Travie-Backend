const { companyExist, companyRegister,companyValidate,hotelExist,addHotel,fetchHotels} = require("../Services/companyService");
const jwt = require("jsonwebtoken");
let companyRemind;

module.exports = {
  companyRegister: async (req, res) => {
    let { companyName, location, email, password } = req.body;

    if (!(companyName && location && email && password)) {
      return res.status(400).json({ message: "All inputs needed" });
    }
    let oldCompany = await companyExist(companyName);

    if (oldCompany) {
      return res.status(409).json({ message: "Company already exists" });
    }

    let addCompany = await companyRegister(req.body);
    if (addCompany) {
      return res
        .status(200)
        .json({ message: "company registered succesfully" });
    } else {
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
  companyLogin:async(req,res)=>{
      let {companyName,password}=req.body
      if(!(companyName&&password)){
        return res.status(400).json({message:"All input fields required"})
      }
      await companyValidate(req.body).then((response)=>{
        if(response.passcheck){
          companyRemind=response._id
          return res.status(200).json({message:"company login success"})
        }
        else if(!response.passcheck&&response){
          return res.status(400).json({message:"company password wrong"})
        }
        else{
          return res.status(400).json({message:"company does not exist"})
        }
      }).catch((er)=>{
        console.error(er)
      })
       
  },
  createHotel:async(req,res)=>{
   let {hotelName,location,price}=req.body

   if(!(hotelName&&location&&price)){
     return res.status(400).json({message:"All inputs needed"})
   }
   let oldHotel = await hotelExist(hotelName)
   if(oldHotel){
     return res.status(400).json({message:"This hotel already exist"})
   }
   req.body.companyId=companyRemind
   let hotelAdded=await addHotel(req.body)
   if(hotelAdded){
     return res.status(200).json({message:"hotel added succesfully"})
   }
   else{
     return res.status(404).json({message:"something went wrong"})
   }
  },
  getAllHotels:async(req,res)=>{
    try{
      let hotels =await fetchHotels()
      if(hotels){
        return res.status(200).json({data:hotels})
      }
      else{
        return res.status(400).json({message:"No hotels at the moment"})
      }
    }
    catch(err){
      console.log(err)
    }
  }
};
