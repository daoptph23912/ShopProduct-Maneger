// import db from "../models/index"
const userService = require("../services/userService");

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if(!email || !password){
        return res.status(500).json({
            errCode : 1,
            message : "Email và Password không được để trống"
        })
    }
    let userData = await userService.handleUserLogin(email, password)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user : userData.user?userData.user :{}
       
       
       
    })
};
let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;
  
   if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Không có dữ liệu',
            users: []
    })
   }
   let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        users
    })
};
let handleCreateNewUsers = async (req, res) => {
    let message = await  userService.createNewUser(req.body)
    console.log(message)
    return res.status(200).json(message)
};
let handleEditUsers = async (req, res) => {
    let data = req.body;
    let message = await userService.editUser(data)
    return res.status(200).json(message)
};
let handleDeleteUsers = async (req, res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "User không tồn tại"
        })
    }else{
        let message = await  userService.deleteUser(req.body.id)
        console.log(message)
        return res.status(200).json(message)
    }
    
};

let handleRoleID = async (req, res) => {
    try {
       let data = await userService.getAllRoleIdServices();
       return res.status(200).json(data) 
    } catch (error) {
        console.log("Lỗi phân quyền",error)
       return res.status(200).json({
            errCode: -1,
            errMessage: 'Không kết nối được với sever'
       })
    }
    
};
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers:handleGetAllUsers,
    handleCreateNewUsers:handleCreateNewUsers,
    handleEditUsers:handleEditUsers,
    handleDeleteUsers:handleDeleteUsers,
    handleRoleID:handleRoleID
    
}