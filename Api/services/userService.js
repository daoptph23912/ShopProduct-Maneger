const db = require("../models/index");
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
let handleUserLogin = (email, password)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let userData = {};
            let isExit = await checkUserEmail(email)
            if(isExit){
                let user = await db.User.findOne({ 
                    
                    where: {email: email},
                    attributes: ['email','roleID','password','firstName','lastName'],
                    raw: true
                })
                if(user){
                  let checkPassword =  bcrypt.compareSync(password,user.password)
                  if(checkPassword){
                    userData.errCode = 0;
                    userData.errMessage = "Đăng nhập thành công";
                    delete user.password;
                    userData.user = user 
                  }else{
                    userData.errCode = 3;
                    userData.errMessage = "Mật khẩu không chính xác"
                  }
                }else{
                    userData.errCode = 2;
                    userData.errMessage = "Email không tồn tại, hãy thử lại 1 email khác";
                }
                
            }else{
                userData.errCode = 1;
                userData.errMessage = "Email không tồn tại, hãy thử lại 1 email khác";

               
            }
            resolve(userData)
        } catch (error) {
            reject(error);
        }
    })
}
let checkUserEmail = (email)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let user = await db.User.findOne({
                where: {email: email}
            })
            if (user) {
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (error) {
            reject(error);
        }
    })
}
let getAllUsers = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let users = '';
            if(id === 'All' ){
                users = db.User.findAll({
                    attributes: {
                        exclude: ['password' ]
                    }
                });

            } 
            if(id && id !== 'All') {
                users = db.User.findOne({
                    where: {id: id},
                    attributes: {
                        exclude: ['password' ]
                    }
                })
            }
         resolve(users);
 
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let createNewUser = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let check = await checkUserEmail(data.email)
            if(check === true) {
                resolve({
                    errCode: 1,
                    errMessage: "Email đã tồn tại, vui lòng chọn email khác",
                    data:{}
                    
                })
            }else{
                let hashPasswordFromBcrypt =  await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password:hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                    roleID: data.roleId,
                })
                resolve({
                    errCode: 0,
                    errMessage: "Ok",
                    data
                    
                })
            }
           
           
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
let deleteUser = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try {
         let users = await  db.User.findOne({
            where: {id: id},
            
         });
         if(!users){
            resolve({
                errCode: 2,
                errMessage: 'User không tồn tại',
            })
           
         }
         await db.User.destroy({
            where: {id: id}
         })
         resolve({
            errCode:0,
            errMessage: 'Xóa thành công'
         })
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let editUser = (data)=>{
    return new Promise(async(resolve, reject)=>{
       try {
        if(!data.id){
            resolve({
                errCode: 2,
                errMessage:"User không tồn tại"
            })
        }
        let users = await  db.User.findOne({
            where: {id: data.id},
            raw: false

           
         });

         
         if(users){
            users.firstName= data.firstName,
            users.lastName= data.lastName,
            users.address= data.address,
            users.roleID= data.roleID,
            users.phoneNumber= data.phoneNumber,
            await users.save()
           
                resolve({
                    errCode: 0,
                    errMessage:"Sửa thành công"
                })
           
         }else{
            resolve({
                errCode: 1,
                errMessage:"User không tồn tại"
            })
         }

       } catch (error) {
            reject(error);
       }
        
        
    })
}
let getAllRoleIdServices = ()=>{
    return new Promise(async(resolve, reject)=>{
        try {
        
            let res = {}
            let Roleid = await db.Role.findAll();
            res.errCode = 0;
            res.errMessage = "OK",
            res.data = Roleid;
            resolve(res)
            
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
module.exports  = {
    handleUserLogin: handleUserLogin,
    getAllUsers:getAllUsers,
    createNewUser:createNewUser,
    deleteUser:deleteUser,
    editUser:editUser,
    getAllRoleIdServices:getAllRoleIdServices
}