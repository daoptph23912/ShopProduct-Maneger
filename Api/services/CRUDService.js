const bcrypt = require('bcryptjs');
const db = require('../models/index');
const salt = bcrypt.genSaltSync(10);
let createNewUser = async(data)=>{
   
    
    return new Promise(async(resolve, reject)=>{
            try {
                let hashPasswordFromBcrypt =  await hashUserPassword(data.password);
                await db.User.create({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password:hashPasswordFromBcrypt,
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                    roleID: data.roleID,
                })
                resolve("Đã thêm User thành công")
            } catch (error) {
                reject(error)
            }
    })
}
let hashUserPassword = (password)=>{
    return new Promise(async(resolve, reject)=>{
       try {
        var hashPassword = await bcrypt.hashSync(password, salt);
        resolve(hashPassword);

       } catch (error) {
            reject(error);
       }
        
        
    })
}
let getAllUsers = ()=>{
    return new Promise(async(resolve, reject)=>{
        try {
         let users = await  db.User.findAll({
            raw : true
         });
         resolve(users);
 
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let getUserById = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try {
         let users = await  db.User.findOne({
            where: {id: id},
            raw : true
         });
         if(users){
            resolve(users);
         }else{
            resolve([])
         }
         
 
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let getUpdateUser = (data)=>{
    
    return new Promise(async(resolve, reject)=>{
        try {
        
         let users = await  db.User.findOne({
            where: {id: data.id}
           
         });

         
         if(users){
            
            users.firstName = data.firstName;
            users.lastName = data.lastName;
            users.address = data.address;
            users.roleID = data.roleID;
            users.phoneNumber = data.phoneNumber;
            await users.save();
            let allUsers = await db.User.findAll();
            resolve(allUsers);
           
         }else{
            resolve();
         }
        
         
         
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let getDeleteCRUD = (id)=>{
   return new Promise(async(resolve, reject)=>{
      try {
       let users = await  db.User.findOne({
          where: {id: id},
          
       });
       if(users){
         await db.User.destroy({
            where: {id: id}
         })
       }
       resolve()

      } catch (error) {
           reject(error);
      }
       
       
   }) 
}
module.exports = {
    createNewUser:createNewUser,
    getAllUsers:getAllUsers,
    getUserById:getUserById,
    getUpdateUser:getUpdateUser,
    getDeleteCRUD:getDeleteCRUD
}