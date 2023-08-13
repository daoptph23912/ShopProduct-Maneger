import axios  from "../axios";
const getAllOrders = (status)=>{
    return axios.get(`/api/get-all-orders-product?status=${status}`)
}
const huyOrdersSucces = (data)=>{
    return axios.put(`/api/huy-orders-success-product`,data)
}
const checkOrderService = (data)=>{
    return axios.put(`/api/check-orders`,data)
}
const GiaoDonService = (data)=>{
    return axios.put(`/api/giao-don-orders`,data)
}
const deleteOrderService = (id)=>{
    return axios.delete(`/api/delete-orders?id=${id}`)
}
const thongKeOrders = (data)=>{
    if(data.key === 0){
        console.log(data)
        return axios.get(`/api/thong-ke-orders?nam=${data.nam}&&thang=${data.thang}&&key=${data.key}`)
    }else if(data.key === 2){
        return axios.get(`/api/thong-ke-orders?tuNgay=${data.tuNgay}&&denNgay=${data.denNgay}&&key=${data.key}`)
    }else if(data.key === 1){
        return axios.get(`/api/thong-ke-orders?ngay=${data.ngay}&&key=${data.key}`)
    }
    
    
}

export  {
    getAllOrders,
    huyOrdersSucces,
    checkOrderService,
    GiaoDonService,
    deleteOrderService,
    thongKeOrders
   
};