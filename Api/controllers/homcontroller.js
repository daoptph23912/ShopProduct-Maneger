const db = require("../models/index");
const CRUDService = require("../services/CRUDService");
let getHomePage =async (req,res)=>{
    
    try {
        
        //let data = await db.Products.findAll();
        let data2 = await db.Categoty.findAll();
       
        return res.render('homepages.ejs',{
           
            data2: JSON.stringify(data2)
        }) 
    } catch (e) {
        console.log(e);
    }
    
}
let getCRUD = async(req,res)=>{
    return res.render('getCRUD.ejs')
}
let postCRUD = async (req, res) => {
   
    let message =   await CRUDService.createNewUser(req.body)
    console.log(message)
    return res.send('Them mới thành công');
}
let getListCRUD = async(req,res)=>{
    let data = await CRUDService.getAllUsers();
   
    return res.render('getListCRUD.ejs',{ data: data});
}
let getEditCRUD = async(req,res)=>{
    let userId = req.query.id;
    if(userId){
        let userData = await CRUDService.getUserById(userId)
       
        return res.render('getEditCRUD.ejs',{
            userData:userData
        })
    }else{
        return res.send('User không tồn tại')
    }
    
    
    
  
   
}
let getPutEditCRUD = async(req,res)=>{
    let data =  req.body;
    let allUsers =  await CRUDService.getUpdateUser(data)
     
    return res.render('getListCRUD.ejs',{ data: allUsers});
    
}
let getDeleteCRUD = async(req,res)=>{
    let userId = req.query.id;
    if(userId){
        await CRUDService.getDeleteCRUD(userId)
       
        return res.send('Xóa thành công')
    }else{
        return res.send('User không tồn tại')
    }
    
}
module.exports = {
    getHomePage: getHomePage,
    getCRUD:getCRUD,
    postCRUD:postCRUD,
    getListCRUD:getListCRUD,
    getEditCRUD:getEditCRUD,
    getPutEditCRUD:getPutEditCRUD,
    getDeleteCRUD:getDeleteCRUD
}