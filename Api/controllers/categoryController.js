const db = require("../models/index");
const categoriesService = require("../services/categoriesService");

let handleGetAllcategories = async (req, res) => {
    
  
    try {
        let data = await categoriesService.handleGetAllCategories();
        return res.status(200).json(data) 
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
let handleAddCategories = async (req, res) => {
    
  
    try {
        let message = await  categoriesService.AddCategoriesService(req.body)
        console.log(message)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
let handleDeleteCategory = async (req, res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Danh sách sản phẩm không tồn tại"
        })
    }else{
        let message = await  categoriesService.deleteCategory(req.body.id)
        console.log(message)
        return res.status(200).json(message)
    }
    
};
let handleEditCategories = async (req, res) => {
    let data = req.body;
    let message = await categoriesService.editCategoryService(data)
    return res.status(200).json(message)
    
};
module.exports = {
    handleGetAllcategories: handleGetAllcategories,
    handleAddCategories:handleAddCategories,
    handleDeleteCategory:handleDeleteCategory,
    handleEditCategories:handleEditCategories
    
}