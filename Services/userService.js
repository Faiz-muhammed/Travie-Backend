const db = require("../config/connection");
const bcrypt = require("bcrypt");
const collection = require("../config/collection");

module.exports = {
  userExist: async(userData) => {
    try {
      return db
        .get()
        .collection(collection.USER_DETAILS)
        .findOne({
          $or: [{ email: userData.email },{ username: userData.username }],
        });
    } catch (err) {
      console.error("error in userExist function", err);
    }
  },
  userRegister:async(userDetails)=>{
    try{
        userDetails.password =await bcrypt.hash(userDetails.password,10)
        return db.get().collection(collection.USER_DETAILS).insertOne(userDetails)
    }
    catch(err){
        console.error("error in userRegister",err)
    }
  },
  userValidate:async(loginData)=>{
   try{
       let user=await db.get().collection(collection.USER_DETAILS).findOne({username:loginData.username})
       if(user){
           bcrypt.compare(loginData.password,user.password).then((res)=>{
               return user
           })
       }
       else{
           return user
       }
   }
   catch(err){
       console.error("error in userValidate",err)
   }
  },
};
