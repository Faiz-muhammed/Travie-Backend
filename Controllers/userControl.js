const jwt = require('jsonwebtoken')
const { userRegister,userValidate } = require("../Services/userService");

module.exports = {
  userSignUp: async (req, res) => {
    let { username, email, password } = req.body;
    if (!(username && email && password)) {
      return res.status(400).json({ message: "All inputs needed" });
    }
    let olduser = await userExist(req.body);
    if (olduser) {
      return res.status(409).json({ message: "User already exists" });
    }

    let userRegistered = await userRegister(req.body);
    if (userRegistered) {
      return res.status(200).json({ message: "user signed Up succesfully" });
    } else {
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
  userLogin:async (req,res)=>{
      let {username,password}=req.body;
      if(!(username&&password)){
          return res.status(400).json({message: "All inputs required"})
      }
      let userValidated=await userValidate(req.body);
      if(userValidated){
          return res.status(200).json({message:"login successful"})
      }
      else{
          return res.status(400).json({message:"User does not exist"})
      }
  }
};
