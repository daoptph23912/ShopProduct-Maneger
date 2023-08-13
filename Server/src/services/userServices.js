import axios  from "../axios";
 const  handleLoginApi =(userEmail,userPassword)=>{
    return axios.post(`/api/login`, { email:userEmail,password:userPassword})
}
const getAllUsers = (inputId)=>{
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
const CreateNewUserService = (data)=>{
    console.log('check Data ', data)
    return axios.post(`/api/creat-new-users`,data)
}
const DeleteUserService = (id)=>{
    
    return axios.delete(`/api/delete-users`,{data:{id:id}})
}
const EditUserService = (imputData)=>{
    
    return axios.put(`/api/edit-users`,imputData)
}
const getRoles = ()=>{
    
    return axios.get(`/roles`)
}
export{
    handleLoginApi,getAllUsers,
    CreateNewUserService,
    DeleteUserService,
    EditUserService,
    getRoles
};