// import jwt, { verify } from "jsonwebtoken"
const jwt = require("jsonwebtoken");

require("dotenv").config()
const  createJWT = ()=>{
    let payload = { name: 'Phạm Thành Đạo', address:"Thái Bình" }
    let key = process.env.NODE_ENV
    let token = null
    try {
         token = jwt.sign(payload,key );
         console.log(token)
    } catch (error) {
        console.log(error)
    }
    
    return token
}
const verifyToken =(token)=>{
    let key = process.env.NODE_ENV
    let data = null
    return new Promise(async(resolve, reject)=>{
        jwt.verify(token, key, function(err, decoded) {
            if(err){
             console.log(err)
             resolve(data) 
            }
          
            resolve(decoded)  
           });
    })
   
     
     
}
module.exports = {
    createJWT,
    verifyToken
}