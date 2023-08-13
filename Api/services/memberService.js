const db = require("../models/index");
const bcrypt = require('bcryptjs');
// import { Server } from "socket.io";
// let io = new Server({port:8080});
// let io = new Server(8080);
let salt = bcrypt.genSaltSync(10);
let handleGetAllMembers = ()=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let res = {}
            let members = await db.Members.findAll({
                attributes: {
                    exclude: ['matKhau' ]
                }
            });
            res.errCode = 0;
            res.errMessage = "OK",
            res.data = members;
            console.log(res.data)
            resolve(res)
        } catch (error) {
            reject(error);
        }
    })
}
let checkUserEmail = (email)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let user = await db.Members.findOne({
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
let hashUserPassword = (password)=>{
    return new Promise(async(resolve, reject)=>{
       try {
        let hashPassword =  bcrypt.hashSync(password.toString(), salt);
        
        resolve(hashPassword);

       } catch (error) {
            reject(error);
       }
        
        
    })
}
let ProfileMembersService = (id)=>{
    
    return new Promise(async(resolve, reject)=>{
        
       try {
            if(id){
                
                let userMember = await  db.Members.findOne({
                    where:{id:id}
                })
                    resolve({
                            errCode: 0,
                            errMessage: "Ok", 
                            userMember
                        })
            }else{
                resolve({
                    errCode: 1,
                    errMessage: "User không tồn tại", 
                })
            }

       } catch (error) {
            reject(error);
       }
        
        
    })

}
let EditProfileMembersService = (data)=>{
    
    return new Promise(async(resolve, reject)=>{
        console.log(data);
       try {
            if(!data.id){
                resolve({
                    errCode: 2,
                    errMessage:"Member không tồn tại"
                })
            }
            let member = await  db.Members.findOne({
                where: {id: data.id},
                raw: false

            
            });
            if(member){
                member.tenThanhVien= data.tenThanhVien,
                member.anhDaiDien= data.anhDaiDien,
                member.soDienThoai= data.soDienThoai,
                member.diaChi= data.diaChi,
                member.gioiTinh= data.gioiTinh,
            
                await member.save()
            
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
let AddMembersService = (data)=>{
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
            
            let hashPasswordFromBcrypt =  await hashUserPassword(data.matKhau);
                console.log(data.matKhau,'lakdfladf')
                console.log(hashPasswordFromBcrypt)
                await db.Members.create({
                    email: data.email,
                    tenThanhVien: data.tenThanhVien,
                    anhDaiDien: data.anhDaiDien,
                    anhCK: data.anhCK,
                    soDienThoai: data.soDienThoai,
                    diaChi: data.diaChi,
                    gioiTinh: data.gioiTinh,
                    matKhau: hashPasswordFromBcrypt,
                    tienTk:0,
                    status:0
                })
              
                resolve({
                    errCode: 0,
                    errMessage: "Ok", 
                })
            
            }
           
        } catch (error) {
            reject(error)
        }
         
     }) 
}
let handleUserMembersLogin = (email, password)=>{
    console.log(password)
    return new Promise(async (resolve, reject)=>{
        try {
            let userData = {};
            let isExit = await checkUserEmail(email)
            if(isExit){
                let user = await db.Members.findOne({ 
                    
                    where: {email: email},
                   
                    
                })
                if(user){
                   
                  let checkPassword =  bcrypt.compareSync(password,user.matKhau)
                 
                  console.log(user.matKhau)
                  if(checkPassword){
                    userData.errCode = 0;
                    userData.errMessage = "Đăng nhập thành công";
                    delete user.matKhau;
                    userData.user = user 
                  }else{
                    userData.errCode = 3;
                    userData.errMessage = "Mật khẩu không chính xác"
                  }
                }else{
                    userData.errCode = 2;
                    userData.errMessage = "Email không tồn tại, hãy thử lại 1 email khác";
                }
                console.log(user)
                
            }else{
                userData.errCode = 4;
                userData.errMessage = "Email không tồn tại, hãy thử lại 1 email khác";

               
            }
            resolve(userData)
        } catch (error) {
            reject(error);
        }
    })
}



let EditMembersService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        
       try {
        
        if(!data.id){
            resolve({
                errCode: 2,
                errMessage:"Members không tồn tại"
            })
        }
        let members = await  db.Members.findOne({
            where: {id: data.id},
            raw: false

           
         });
         if(members){
                
                members.tenThanhVien= data.tenThanhVien,
                members.gioiTinh= data.gioiTinh,
                members.anhDaiDien= data.anhDaiDien,
               
                members.soDienThoai= data.soDienThoai,
                members.diaChi= data.diaChi,
                members.tienTk= data.tienTk,
                members.status= data.status,

            await members.save()
           
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
let checkUserMember = (id)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            
            let user = await db.Members.findOne({
                where: {id: id}
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
let napTienMembersService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        
       try {
        // console.log(data.idUser);
        let isExit = checkUserMember(data.idUser)
        // console.log(isExit)
        
        if(isExit === false){
            resolve({
                errCode: 2,
                errMessage:"Members không tồn tại"
            })
        }else{
            
            await db.Prices.create({
                anhCK: data.anhCK,
                idUser: data.idUser,
                tienNap: data.tienNap,
                status: data.status
             })
             await db.Members.update(
                {status: 1},
                {where: {id:data.idUser}}
             )
             resolve({
                errCode: 0,
                errMessage:"Đã nạp tiền"
            })
        }  
       } catch (error) {
            reject(error);
       }
        
        
    })
}
let lichSuNapTienMembersService = (id)=>{
    return new Promise(async(resolve, reject)=>{
        console.log(id,"adfadf")
       try {
        // console.log(data.idUser);
        let isExit = checkUserMember(id)
        // console.log(isExit)
        
        if(isExit === false){
            resolve({
                errCode: 2,
                errMessage:"Members không tồn tại"
            })
        }else{
            let res = {}
            let price = await db.Prices.findAll({  
                where: {idUser: id}, 
            });
            res.errCode = 0;
            res.errMessage = "OK",
            res.data = price;
           
            resolve(res)
        }  
       } catch (error) {
            reject(error);
       }
        
        
    })
}
let napTienMembersServiceAdmin = (data)=>{
    return new Promise(async(resolve, reject)=>{
        
       try {
        // console.log(data.idUser);
        let isExit = checkUserMember(data.idUser)
        // console.log(isExit)
        
        if(isExit === false){
            resolve({
                errCode: 2,
                errMessage:"Members không tồn tại"
            })
        }else{
            let price = await db.Members.findOne({
                where: {id: data.idUser}
                })
            let priceMembers = price.tienTk 
            await db.Prices.update(
                {
                status: 1
                },
                {where: {id:data.id}}
             )
             await db.Members.update(
                {status: 0,
                tienTk: parseInt(priceMembers) +parseInt(data.tienNap) 
                },
                {where: {id:data.idUser}}
             )
             resolve({
                errCode: 0,
                errMessage:"Đã nạp tiền"
            })
        }  
       } catch (error) {
            reject(error);
       }
        
        
    })
}
let huyNapTienMembersServiceAdmin = (id)=>{
    return new Promise(async(resolve, reject)=>{
        
       try {
        // console.log(data.idUser);
        // let isExit = checkUserMember(data.idUser)
        // console.log(isExit)
        
      
            await db.Prices.update(
                {status: 2,
                
                },
                {where: {id:id}}
             )
             resolve({
                errCode: 0,
                errMessage:"Đã hủy nạp tiền"
            })
          
       } catch (error) {
            reject(error);
       }
        
        
    })
}
let getOneMember = (id)=>{
    return new Promise(async(resolve, reject)=>{
        
       try {
        // console.log(data.idUser);
        // let isExit = checkUserMember(data.idUser)
        // console.log(isExit)
        
      
           let member =  await db.Members.findOne(
                
                {where: {id:id}}
             )
            if(member){
                resolve({
                    errCode: 0,
                    errMessage:"Đã hủy nạp tiền",
                    member:member
                })
            }else{
                resolve({
                    errCode: 1,
                    errMessage:"Tài khoản không tồn tại",
                    member:{}
                })
            }
            
          
       } catch (error) {
            reject(error);
       }
        
        
    })
}
let deleteMembersService = (id)=>{
    return new Promise(async(resolve, reject)=>{
        
       try {
        // console.log(data.idUser);
        // let isExit = checkUserMember(data.idUser)
        // console.log(isExit)
            let members = await db.Members.findOne({id:id})
        if(members){
            await db.Members.destroy(
              
                {where: {id:id}}
             )
             resolve({
                errCode: 0,
                errMessage:"Đã Xóa tài khoản"
            })
        }else{
            resolve({
                errCode: 1,
                errMessage:"user không tồn tại"
            })
        }
           
          
       } catch (error) {
            reject(error);
       }
        
        
    })
}
let DeleteNapTienMember = (id)=>{
    return new Promise(async(resolve, reject)=>{
        
       try {
        // console.log(data.idUser);
        // let isExit = checkUserMember(data.idUser)
        // console.log(isExit)
            let Price = await db.Prices.findOne({id:id})
        if(Price&& Price.status == 1){
            await db.Prices.destroy(
              
                {where: {id:id,status: 1}}
             )
             resolve({
                errCode: 0,
                errMessage:"Đã Xóa Price"
            })
        }else{
            resolve({
                errCode: 1,
                errMessage:"Price không tồn tại"
            })
        }
           
          
       } catch (error) {
            reject(error);
       }
        
        
    })
}
module.exports  = {
    handleGetAllMembers:handleGetAllMembers,
    AddMembersService:AddMembersService,
    handleUserMembersLogin:handleUserMembersLogin,
    ProfileMembersService:ProfileMembersService,
    EditProfileMembersService:EditProfileMembersService,
    EditMembersService:EditMembersService,
    deleteMembersService:deleteMembersService,
    napTienMembersService:napTienMembersService,
    lichSuNapTienMembersService:lichSuNapTienMembersService,
    napTienMembersServiceAdmin:napTienMembersServiceAdmin,
    huyNapTienMembersServiceAdmin:huyNapTienMembersServiceAdmin,
    getOneMember:getOneMember,
    DeleteNapTienMember:DeleteNapTienMember
    
    
}