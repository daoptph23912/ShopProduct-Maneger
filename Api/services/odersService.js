const db = require("../models/index");
const { Sequelize } = require('sequelize');
const { QueryTypes } = require('sequelize');
const sequelize = require("../config/queryDatabase");
const Op = require('sequelize').Op;
let checkProducts = (id)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            
            let Products = await db.Products.findOne({
                where: {id: id}
            })
            
            if (Products) {
                resolve(true)
            }else{
                
                resolve(false)
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
let handleGetUserCart = (id)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let checkUser = await checkUserMember(id)
            let User = await db.Members.findOne({
                where: {id:id }
            })
            if(checkUser){
                
               let getCart = await db.Carts.findAll({
                    where: {idUser: id,
                        status : 0
                    },
                    order: [
                        ['id', 'ASC'],
                       
                    ]
                })
                
               if(User){
                resolve({
                    errCode: 0,
                    errMessage :"List thành công",
                    Carts :getCart
                })
               }else{
                resolve({
                    errCode: 0,
                    errMessage :"User không tồn tại",
                    
                })
               }
                    
                   


                
            }else{
                resolve({
                    errCode: 1,
                    errMessage:"User không tồn tại",

                })
            }
          
        } catch (error) {
            reject(error);
        }
    })
}
let handleAddCart = (data)=>{

    return new Promise(async(resolve, reject)=>{
        try {
           let idSP = data.idSP;
           let 	idUsers = data.idUser;
           let check = checkProducts(idSP)
           
           let checkUser = checkUserMember(idUsers)
         
                let User = await db.Members.findOne({
                    where: {id:idUsers }
                })
                
                let dataProduct = await db.Products.findOne({
                    where: {id:idSP }
                })
                if(dataProduct&&User){
                    await db.Carts.create({
                        ipSanPham: dataProduct.id,
                        idUser: idUsers,
                        size: data.size,
                        soLuong: data.soLuong,
                        thanhTien: dataProduct.sale ==0?dataProduct.giaSanPham:(dataProduct.giaSanPham-(dataProduct.giaSanPham*dataProduct.sale/100)),
                        status: 0
                    })
                    resolve({
                        errCode: 0,
                        errMessage:"Đã thêm sản phẩm vào Giỏ hàng",
    
                    })
                }else{
                    resolve({
                        errCode: 1,
                        errMessage:"Sản phẩm hoặc user không tồn tại"
                    })
                }
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let handleDeleteCart = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try {
         let Cart = await  db.Carts.findOne({
            where: {id: id},
            
            
         });

         if(!Cart){
            resolve({
                errCode: 2,
                errMessage: 'giỏ hàng không tồn tại',
            })
           
         }else{
            await db.Carts.destroy({
                where: {id: id}
             })
             resolve({
                errCode:0,
                errMessage: 'Xóa thành công'+ Cart.id
             })
         }
         
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}

let handleUpdateCart = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
        
         let Cart = await  db.Carts.findOne({
            where: {id: data.id}, 
         });
         let idSP = Cart.ipSanPham
         let dataProduct = await db.Products.findOne({
            where: {id:idSP }
        })
         
         console.log(Cart);
         if(!Cart){
            resolve({
                errCode: 2,
                errMessage: 'giỏ hàng không tồn tại',
            })
           
         }else{
            await db.Carts.update(
                
                {
                    soLuong: data.soLuong,
                    thanhTien: dataProduct.sale ==0?dataProduct.giaSanPham *data.soLuong:(dataProduct.giaSanPham-(dataProduct.giaSanPham*dataProduct.sale/100))*data.soLuong,
                    size: data.size
                },
                {where: {id: data.id}}
             )
             resolve({
                errCode:0,
                errMessage: 'update thành công'+ Cart.id
             })
         }
         
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let handleCreateOrderCart = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {

            let idCart = [...data.idCart]
            let idUser = data.idUser
            
            let user = await db.Members.findOne({
                where : {id : idUser}
            })
            let tienTk = user.tienTk
            console.log(idCart.length)
            if(idCart.length>0){
                if(user){
                        await db.Orders.create({
                            idCart: data.idCart,
                            idUser: idUser,
                            tongTien: data.tongTien,
                            status: 0
                        })
                        await db.Carts.update(
                            {status: 1},
                            {
                            where: {idUser:idUser,
                                    status: 0
                                }
                            }
                        )
                        await db.Members.update(
                            {tienTk: tienTk - data.tongTien },
                            {
                            where: {id : idUser}
                            }
                        )
                        
                        resolve({
                            errCode:0,
                            errMessage: 'Đã đặt hàng thành công vui lòng chờ bên shop giao hàng'
                         })
                        
                   
                    
                }else{
                    resolve({
                        errCode:1,
                        errMessage: 'User không tồn tại'
                     })
                }
            }else{
                resolve({
                    errCode:3,
                    errMessage: 'Không có sản phẩm nào trong giỏ hàng'
                 })
            }
           
           
    
         
     
       
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}

let handleLichSuOrderCart = (id)=>{
    
    return new Promise(async (resolve, reject)=>{
        try {
            let checkUser = await checkUserMember(id)
            let User = await db.Members.findOne({
                where: {id:id }
            })
            if(checkUser){
                
               let getOrders = await db.Orders.findAll({
                    where: {idUser: id,
                       [Op.or]: [
                            { status: 0 },
                            { status: 1 }
                          ]
                            
                    },
                    order: [
                        ['id', 'DESC'],
                       
                    ]
                }) 
                let getAllOrder = await db.Orders.findAll({
                    where: {idUser: id,
                       [Op.or]: [
                            { status: 0 },
                            { status: 1 },
                            { status: 2 },
                            { status: 3 },
                          ]
                            
                    },
                    order: [
                        ['id', 'DESC'],
                       
                    ]
                })
                let getDaDangGiao = await db.Orders.findAll({
                    where: {idUser: id,
                        status : 2
                    },
                    order: [
                        ['id', 'DESC'],
                       
                    ]
                })
                let getCarts = await db.Carts.findAll({
                    where: {idUser: id,
                        [Op.or]: [
                            { status: 1 },
                            { status: 2 },
                            { status: 3 }
                          ]
                            
                    },
                    order: [
                        ['id', 'DESC'],
                       
                    ]
                })
                 let getDaGiaoThanhCong = await db.Orders.findAll({
                    where: {idUser: id,
                        status : 3
                    },
                    order: [
                        ['id', 'DESC'],
                       
                    ]
                })
                let getDonHuy = await db.Orders.findAll({
                    where: {idUser: id,
                        [Op.or]: [
                            { status: 4 },
                            { status: 5 }
                          ]
                    },
                    order: [
                        ['id', 'DESC'],
                       
                    ]
                })
                let getAllProducts = await db.Products.findAll()
                
               if(User){
                resolve({
                    errCode: 0,
                    errMessage :"List thành công",
                    getOrders :getOrders,
                    getCarts:getCarts,
                    getAllProducts:getAllProducts,
                    getDaGiaoThanhCong:getDaGiaoThanhCong,
                    getDaDangGiao:getDaDangGiao,
                    getDonHuy:getDonHuy,
                    getAllOrder:getAllOrder

                })
               }else{
                resolve({
                    errCode: 0,
                    errMessage :"User không tồn tại",
                    
                })
               }
 
            }else{
                resolve({
                    errCode: 1,
                    errMessage:"User không tồn tại",

                })
            }
          
        } catch (error) {
            reject(error);
        }
    })
}
let handleHuyOrderCart = (id)=>{
    return new Promise(async(resolve, reject)=>{
        console.log(id)
        try {
         let Order = await  db.Orders.findOne({
            where: {id: id},  
         });

         if(!Order){
            resolve({
                errCode: 2,
                errMessage: 'đơn hàng không tồn tại',
            })
           
         }else{
            await db.Orders.update(
                {status: 4},
                {where: {id: id}}
             )
             
             resolve({
                errCode:0,
                errMessage: 'update thành công'
             })
         }
         
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let handleChiTietOrderCart = (id)=>{
    return new Promise(async(resolve, reject)=>{
        console.log(id)
        try {
         let Order = await  db.Orders.findOne({
            where: {id: id},  
         });

         if(!Order){
            resolve({
                errCode: 2,
                errMessage: 'đơn hàng không tồn tại',
            })
           
         }else{
             resolve({
                errCode:0,
                errMessage: 'thành công',
                detailOrder: Order
             })
         }
         
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let handleGetAllOrder = (status)=>{
    return new Promise(async(resolve, reject)=>{
        
        try {
            if(status =="All"){
                let Order = await  db.Orders.findAll({
                    order: [
                        ['id', 'DESC'],
                       
                    ]
                 });
               
                 let getCarts = await db.Carts.findAll({
                    where: {
                        [Op.or]: [
                            { status: 1 },
                            { status: 2 },
                            { status: 3 }
                          ]
                            
                    },
                    order: [
                        ['id', 'DESC'],
                       
                    ]
                })
        
                 if(!Order){
                    resolve({
                        errCode: 2,
                        errMessage: 'đơn hàng không tồn tại',
                    })
                   
                 }else{
                     resolve({
                        errCode:0,
                        errMessage: 'thành công',
                        getAllOrder: Order,
                        getCarts: getCarts
                     })
                 }
            }else{
                let Order = await  db.Orders.findAll({
                    where: {status:status},
                    order: [
                        ['id', 'DESC'],
                       
                    ]
                 });
               
                 let getCarts = await db.Carts.findAll({
                    where: {
                            
                            [Op.or]: [
                                { status: 1 },
                                { status: 2 },
                                { status: 3 }
                              ]
                            
                    },
                    order: [
                        ['id', 'DESC'],
                       
                    ]
                })
        
                 if(!Order){
                    resolve({
                        errCode: 2,
                        errMessage: 'đơn hàng không tồn tại',
                    })
                   
                 }else{
                     resolve({
                        errCode:0,
                        errMessage: 'thành công',
                        getAllOrder: Order,
                        getCarts: getCarts
                     })
                 }

            }
         
         
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let handleHuyDonThanhCongService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        let id = data.id;
        // let arrCarts =JSON.parse(data.arrCarts) ;
        // let arrCartsData = [];
        let idUser = data.idUser;
        let tongTien = data.tongTien
        try {
         let Order = await  db.Orders.findOne({
            where: {id: id},  
         });
         let user = await  db.Members.findOne({
            where: {id: idUser},  
         });
        //  let arrCartsItem = await db.Carts.findAll()
        //  arrCartsItem.map((arrCartsItem) =>{
        //     arrCarts.map((item)=>{
        //         if(arrCartsItem.id === item){
        //             arrCartsData.push(arrCartsItem)
        //         }
        //     })
        //  })
         let soDu = user.tienTk
        //  let arrProduct =  await db.Products.findAll()
         if(!Order){
            resolve({
                errCode: 2,
                errMessage: 'đơn hàng không tồn tại',
            })
           
         }else{
            await db.Orders.update(
                {status: 5},
                {where: {id: id}}
             )
             await db.Members.update(
                {tienTk: soDu+tongTien},
                {where: {id: idUser}}
             )
            //  arrCartsData.map((itemArrCartsData)=>{
            //     arrProduct.map((productArr)=>{
            //         if(itemArrCartsData.ipSanPham===productArr.id){
            //              db.Products.update(
            //                 {soluong: arrProduct.soLuong-arrCartsData.soLuong},
            //                 {where: {id: itemArrCartsData.ipSanPham}}
            //              )
            //         }
            //     })
            //  })
             resolve({
                errCode:0,
                errMessage: 'thành công',
               
             })
         }
         
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let handleDeleteOrderService = (id)=>{
    return new Promise(async(resolve, reject)=>{
        
        try {
            
         let Order = await  db.Orders.findOne({
            where: {id: id},  
         });

         if(!Order){
            resolve({
                errCode: 2,
                errMessage: 'đơn hàng không tồn tại',
            })
           
         }else{
            await  db.Orders.destroy(
                {
                    where: {id: id}
                }
            )
             resolve({

                errCode:0,
                errMessage: 'thành công',
               
             })
         }
         
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let handleCheckOrderService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        
        try {
            let idUser = data.idUser
            let id = data.id
            let arrCartsItem = await db.Carts.findAll({
                where: {idUser:idUser}
            })
            let Order = await  db.Orders.findOne({
                where: {id: id},  
            });
            let arrCartsUser = []
            let arrProduct =  await db.Products.findAll()
            let arrCarts = JSON.parse(data.arrCarts)
            
            arrCarts.map((item)=>{
                arrCartsItem.map((arrCartsItems)=>{
                    if(arrCartsItems.id === item){
                        arrCartsUser.push(arrCartsItems)
                    }
                })
            })
          
            
         if(!Order){
            resolve({
                errCode: 2,
                errMessage: 'đơn hàng không tồn tại',
            })
           
         }else{
            await db.Orders.update(
                {status: 2},
                {where: {id: id}}
             )
            arrCartsUser.map(async(item)=>{
                await db.Carts.update(
                    {status:2
                        
                    },
                    {where: {id: item.id}}
                )
                arrProduct.map( async(products)=>{
                    if(item.ipSanPham === products.id){
                        await db.Products.update(
                            {soLuong: products.soLuong - item.soLuong,
                            luotMua: products.luotMua + item.soLuong
                            },
                            {where: {id: item.ipSanPham}}
                         )
                    }
                })
            })
             resolve({

                errCode:0,
                errMessage: 'thành công',
               
             })
         }
         
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let handleGiaoDonService = (data)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            console.log(data);
            let id = data.id
            let status = data.status
            let Order = await  db.Orders.findOne({
                where: {id: id},  
            });

         if(!Order){
            resolve({
                errCode: 2,
                errMessage: 'đơn hàng không tồn tại',
            })
           
         }else{
            await db.Orders.update(
                {status: status},
                {where: {id: id}}
             )
             resolve({ 
                errCode:0,
                errMessage: 'thành công',
                
             })
         }
         
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}

let handleThongKeOrdersService = (data)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            
            if(data&& parseInt(data.key) ===2){
                let tuNgay = data.tuNgay
                let denNgay = data.denNgay
               
                const result = await sequelize.query(`
                SELECT ipSanPham, SUM(soLuong) AS tongSoLuong, SUM(thanhTien) AS tongPrice
                FROM carts
                Where status = 2 And updatedAt BETWEEN '${tuNgay}' AND '${denNgay}'
                
                GROUP BY ipSanPham
                ORDER BY tongSoLuong DESC
                
                `, { type: QueryTypes.SELECT });
          
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    result:result
                 })       
            }else if(parseInt(data.key) === 0){
                console.log(data,"adk;fak");
                let thang = data.thang
                let nam = data.nam
                const result = await sequelize.query(`
                SELECT ipSanPham, SUM(soLuong) AS tongSoLuong, SUM(thanhTien) AS tongPrice, status
                FROM carts
                Where status = 2 And YEAR(updatedAt) = ${parseInt(nam)} AND MONTH(updatedAt) = ${parseInt(thang)}
                
                GROUP BY ipSanPham
                ORDER BY tongSoLuong DESC
                
                `, { type: QueryTypes.SELECT });
                console.log(result)
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    result:result
                 })       
            }else if(parseInt(data.key) === 1){
               
                let ngay = data.ngay
                console.log(ngay)
                const result = await sequelize.query(`
                SELECT ipSanPham, SUM(soLuong) AS tongSoLuong, SUM(thanhTien) AS tongPrice, status
                FROM carts
                Where status = 2 And DATE(updatedAt) = '${ngay}'
                
                GROUP BY ipSanPham
                ORDER BY tongSoLuong DESC
                
                `, { type: QueryTypes.SELECT });
               
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    result:result
                 })       
            }
               
         
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
module.exports  = {
    handleAddCart:handleAddCart,
    handleDeleteCart:handleDeleteCart,
    handleGetUserCart:handleGetUserCart,
    handleUpdateCart:handleUpdateCart,
    handleCreateOrderCart:handleCreateOrderCart,
    handleLichSuOrderCart:handleLichSuOrderCart,
    handleHuyOrderCart:handleHuyOrderCart,
    handleChiTietOrderCart:handleChiTietOrderCart,
    handleGetAllOrder:handleGetAllOrder,
    handleHuyDonThanhCongService:handleHuyDonThanhCongService,
    handleDeleteOrderService:handleDeleteOrderService,
    handleCheckOrderService:handleCheckOrderService,
    handleGiaoDonService:handleGiaoDonService,
    handleThongKeOrdersService:handleThongKeOrdersService
    
}