const  odersService = require("../services/odersService");
let handleOdersProducts = async (req, res) => {
    try {
        let data = req.body
        console.log(data);
        let message = await  odersService.handleAddCart(data)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}
let handleGetUserCartProducts = async (req, res) => {
    try {
        
        let id = req.query.id
        
        let message = await  odersService.handleGetUserCart(id)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}
let handleDeleteCartProducts = async (req, res) => {
    try {
        let id = req.query.id
        let message = await  odersService.handleDeleteCart(id)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}
let handleUpdateCartProducts = async (req, res) => {
    try {
        let data = req.body
        console.log(data)
        let message = await  odersService.handleUpdateCart(data)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}
let handleOrserCartProducts = async (req, res) => {
    try {
        let data = req.body
        console.log(data)
        let message = await  odersService.handleCreateOrderCart(data)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}
let handleLichSuCartProducts = async (req, res) => {
    try {
        let id = req.query.id
       
        let message = await  odersService.handleLichSuOrderCart(id)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}
let handleHuyDonCartProducts = async (req, res) => {
    try {
        let id = req.body.id
        console.log(id)
        let message = await  odersService.handleHuyOrderCart(id)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}
let handleChiTietDonProducts = async (req, res) => {
    try {
        let id = req.query.id
        console.log(id)
        let message = await  odersService.handleChiTietOrderCart(id)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}
let handleGetAllOrdersProducts = async (req, res) => {
    try {
        let status = req.query.status
        let message = await  odersService.handleGetAllOrder(status)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}
let handleHuyDonThanhCongProducts = async (req, res) => {
    try {
        let data = req.body
        console.log(data,"kd;adf")
        let message = await  odersService.handleHuyDonThanhCongService(data)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}
let handleDeleteOrder = async (req, res) => {
    try {
        let id = req.query.id
        
        let message = await  odersService.handleDeleteOrderService(id)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}
let handleCheckOrder = async (req, res) => {
    try {
        let data = req.body
        
        let message = await  odersService.handleCheckOrderService(data)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}
let handleGiaoDonOrder = async (req, res) => {
    try {
        let data = req.body
        
        let message = await  odersService.handleGiaoDonService(data)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}
let handleThongKeOrders = async (req, res) => {
    try {
        
        let data = req.query
       
        let message = await  odersService.handleThongKeOrdersService(data)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({



             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}

module.exports = {
    handleOdersProducts: handleOdersProducts,
    handleDeleteCartProducts:handleDeleteCartProducts,
    handleGetUserCartProducts:handleGetUserCartProducts,
    handleUpdateCartProducts:handleUpdateCartProducts,
    handleOrserCartProducts:handleOrserCartProducts,
    handleLichSuCartProducts:handleLichSuCartProducts,
    handleHuyDonCartProducts:handleHuyDonCartProducts,
    handleChiTietDonProducts:handleChiTietDonProducts,
    handleGetAllOrdersProducts:handleGetAllOrdersProducts,
    handleHuyDonThanhCongProducts:handleHuyDonThanhCongProducts,
    handleDeleteOrder:handleDeleteOrder,
    handleCheckOrder:handleCheckOrder,
    handleGiaoDonOrder:handleGiaoDonOrder,
    handleThongKeOrders:handleThongKeOrders
  
}