import axios  from "../axios";
const getAllMembers = ()=>{
    return axios.get(`/api/get-all-members`)
}
const createNewMembers = (data)=>{
    return axios.post(`/api/add-member`,data)
}

const getLichSuNap = (id)=>{
    console.log(id,"getId")
    return axios.get(`/api/lich-su-naptien-members-admin?id=${id}`)
}
const deleteMembersService = (id)=>{
    return axios.delete(`/api/delete-members`,{data:{id:id}})
}
const editMembersService = (data)=>{
    return axios.put(`/api/edit-members`,data)
}
const editMembersPrices = (data)=>{
    console.log(data,"imputData")
    return axios.put(`/api/naptien-members-admin`,data)
}
const editHuyPricesMembers = (data)=>{
    console.log(data,"d")
    return axios.put(`/api/huynaptien-members-admin`,data)
}

export{
    getAllMembers,
    createNewMembers,
    deleteMembersService,
    editMembersService,
    getLichSuNap,
    editMembersPrices,
    editHuyPricesMembers
}