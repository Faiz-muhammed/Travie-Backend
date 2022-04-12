const bcrypt = require("bcrypt");
const Collection = require("../config/collection");
const db=require("../config/connection")

module.exports = {
  companyExist: (company) => {
    return db
      .get()
      .collection(collection.COMPANY_DETAILS)
      .findOne({ companyName: company });
  },
  companyRegister: async (regData) => {
    try {
      regData.password = await bcrypt.hash(regData.password, 10);
      let insertedCompany = await db
        .get()
        .collection(Collection.COMPANY_DETAILS)
        .insertOne(regData);
      return insertedCompany;
    } catch (err) {
      console.error("Error while registering company", err);
    }
  },
  companyValidate:async(companyDetails)=>{
   try{
     return new Promise(async(resolve,reject)=>{
      let company=await db.get().collection(Collection.COMPANY_DETAILS).findOne({companyName:companyDetails.companyName})
      if(company){
        bcrypt.compare(companyDetails.password,company.password).then((status)=>{
          if(status){
            company.passcheck=true
          }
          else{
            company.passcheck=false
          }
          resolve(company)
        })
      }
      else if(!company){
        resolve(false)
      }
      else{
        reject({err:"error"})
      }
     })
     
   }
   catch(err){
     console.error("error in companyValidate",err)
   }
  }
};
