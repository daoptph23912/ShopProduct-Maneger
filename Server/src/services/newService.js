import axios  from "../axios";
const getAllNews = ()=>{
    return axios.get(`/api/get-all-news`)
}
const addNewsService = (data)=>{
    return axios.post(`/api/add-news`,data)
}
const deleteNewsService = (id)=>{
    return axios.delete(`/api/delete-news?id=${id}`)
    
}
const editNewsService = (data)=>{
    return axios.put(`/api/edit-news`,data)
}
export  {
    getAllNews,
    addNewsService,
    deleteNewsService,
    editNewsService
};