const db = require("../models/index");

const sequelize = require("../config/queryDatabase")
const { QueryTypes } = require('sequelize');

let handleGetAllProductsService = (page)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            console.log(page)
            let limit = 5;
            let offset = (page - 1) * limit;
            let res = {}
            let products = await db.Products.findAndCountAll({
                offset,
                limit,
                order: [
                    ['id', 'DESC'],
                    
                ]
                  
              },);
            let categories = await db.Categories.findAll();
            let totalProducts = await db.Products.findAll({
                order: [
                    ['id', 'DESC'],
                   
                ]
            });
            res.errCode = 0;
            res.errMessage = "OK",
            res.products = products.rows ;
            res.categories = categories;
            res.totalProducts = totalProducts;
            
            resolve(res)
            
         resolve(res);
 
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let handleGetAllTotalProductsService = ()=>{
    return new Promise(async(resolve, reject)=>{
        try {
           
           
            let res = {}
            let categories = await db.Categories.findAll({
                order: [
                    ['id', 'DESC'],
                   
                ]
            });
            let totalProducts = await db.Products.findAll();
            let sanPhamMuaNhieu = await sequelize.query(`
            SELECT *
            FROM products
            Where luotMua > 0 
            ORDER BY luotMua DESC
            LIMIT 7
            
            `, { type: QueryTypes.SELECT }); 
           
            let sale = await sequelize.query(`
            SELECT *
            FROM products
            Where sale > 25 
            ORDER BY sale DESC
            LIMIT 7
            
            `, { type: QueryTypes.SELECT }); 
            res.errCode = 0;
            res.errMessage = "OK",
            res.categories = categories;
            res.totalProducts = totalProducts;
            res.sanPhamMuaNhieu = sanPhamMuaNhieu;
            res.sale = sale;
            
            resolve(res)
            
         resolve(res);
 
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let handleGetAllCategoriesProductService = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            console.log(id)
            if(id && id==="luotMuaNhieu"){
                let getAllLuotMuaNhieu = await sequelize.query(`
                SELECT *
                FROM products
                Where luotMua > 0 
                ORDER BY luotMua DESC
                `, { type: QueryTypes.SELECT });
                resolve({
                    errCode: 0,
                    errMessage: "OK",
                    getAllLuotMuaNhieu:getAllLuotMuaNhieu
                })

            }else if(id && id==="hotSale"){
                let getHotSaleAll = await sequelize.query(`
                SELECT *
                FROM products
                Where sale > 25 
                ORDER BY sale DESC
               
                
                `, { type: QueryTypes.SELECT }); 
                resolve({
                    errCode: 0,
                    errMessage: "OK",
                    getHotSaleAll:getHotSaleAll
                })
            }else{
                let products = await sequelize.query(`
                SELECT *
                FROM products
                Where idDanhSach = ${id}
                ORDER BY id DESC
                `, { type: QueryTypes.SELECT });

                resolve({
                    errCode: 0,
                    errMessage: "OK",
                    products:products})
            }
           
           
            
       
 
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}

// let handleGetProductsService = (id)=>{
//     return new Promise(async(resolve, reject)=>{
//         try {
//             let res = {}
//             let limit = 5;
//             let offset = 0 + (page - 1) * limit;
            
//             let products = await db.Products.findAndCountAll({
//                 offset: offset,
//                 limit: limit,
//                 order: [["id", "DESC"]],
//             });
           
//             res.products = [...products];
            
//             resolve(res)
            
//          resolve(res);
 
//         } catch (error) {
//              reject(error);
//         }
         
         
//      }) 
// }


//CHATGPT
let handleGetProductsService = (page) => {
    return new Promise(async (resolve, reject) => {
      try {
        let res = {};
        let limit = 5;
        let offset = (page - 1) * limit;
  
        let products = await db.Products.findAndCountAll({
          offset: offset,
          limit: limit,
          order: [["id", "DESC"]],
        });
  
        res.products = [...products];
  
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };
  
let page = 2; // Giá trị page tùy ý, ví dụ 2, 3, 4,...
handleGetProductsService(page)
  .then((result) => {
    // Xử lý kết quả trả về từ hàm handleGetProductsService
    // ...
  })
  .catch((error) => {
    // Xử lý lỗi nếu có
    // ...
  });


let AddProductsService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            console.log(data,"adlfalfn")
                if(data){
                    await db.Products.create({
                        tenSp: data.tenSp,
                        hangSx: data.hangSx,
                        giaSanPham: data.giaSanPham,
                        giaNhap: data.giaNhap,
                        idDanhSach: data.idDanhSach,
                        soLuong: data.soLuong,
                        hot: data.hot,
                        sale: data.sale,
                        mota: data.mota,
                        image: data.image,
                    })
                    resolve({
                        errCode: 0,
                        errMessage: "Ok",
                        data
                        
                    })
                }else{
                    resolve({
                        errCode: 1,
                        errMessage: "Lỗi",
                        data
                        
                    })
                }
                
                
            
           
           
        } catch (error) {
            reject(error)
        }
         
     }) 
}
let deleteProduct = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try {
         let products = await  db.Products.findOne({
            where: {id: id},
            
            
         });
         if(!products){
            resolve({
                errCode: 2,
                errMessage: 'sản phẩm không tồn tại',
            })
           
         }else{
            await db.Products.destroy({
                where: {id: id}
             })
             resolve({
                errCode:0,
                errMessage: 'Xóa thành công'
             })
         }
         
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let handleGetOneProductService = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try {
         let products = await  db.Products.findOne({
            where: {id: id},
            
            
         });
         let arProduct = await  db.Products.findAll(
            {
                where: {idDanhSach : products.idDanhSach,
                },
                limit: 5,
                order: [
                    ['id', 'DESC'],
                   
                ]
              
                    
            }
  
         );
         if(!products){
            resolve({
                errCode: 2,
                errMessage: 'sản phẩm không tồn tại',
            })
           
         }else{
             resolve({
                errCode:0,
                errMessage: ' thành công',
                getDetailProduct: products,
                arProduct:arProduct
             })
         }
         
         
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let editProductsService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        console.log(data.dataImput,"adadfadf");
       try {
        
        if(!data.dataImput.id){
            resolve({
                errCode: 2,
                errMessage:"Products không tồn tại"
            })
        }
        let products = await  db.Products.findOne({
            where: {id: data.dataImput.id},
            raw: false

           
         });
         if(products){
                products.tenSp= data.dataImput.tenSp,
                products.hangSx= data.dataImput.hangSx,
                products.giaSanPham= data.dataImput.giaSanPham,
                products.idDanhSach= data.dataImput.idDanhSach,
                products.giaNhap= data.dataImput.giaNhap,
                products.hot= data.dataImput.hot,
                products.sale= data.dataImput.sale,
                products.soLuong= data.dataImput.soLuong,
                products.mota= data.dataImput.mota,
                products.image= data.dataImput.image,

            await products.save()
           
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

module.exports  = {
    handleGetAllProductsService: handleGetAllProductsService,
    AddProductsService:AddProductsService,
    deleteProduct:deleteProduct,
    editProductsService:editProductsService,
    handleGetProductsService:handleGetProductsService,
    
    handleGetOneProductService:handleGetOneProductService,
    handleGetAllTotalProductsService:handleGetAllTotalProductsService,
    handleGetAllCategoriesProductService:handleGetAllCategoriesProductService,
  
    
    
}