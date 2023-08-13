import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import ModalNews from './ModalNews';
import ModalEditNews from './ModalEditNews';
import {getAllNews,addNewsService,deleteNewsService} from "../../../services/newService"
import axios from 'axios';
import Moment from 'moment';
import vi from "moment/locale/vi";
import fr from "moment/locale/fr";
import { toast } from 'react-toastify';
class NewsManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
            isOpenEditNewsModal: false,
            arrNews: [],
            itemNew : {}
        }

    }
    async componentDidMount() {
        await this.getAllNews();
        
     }
    getAllNews = async()=>{
        let data = await getAllNews()
        if(data.errCode === 0){
            this.setState({
                arrNews: data.news
            })
        }
    }
    handleAddNewNews = ()=>{
        this.setState({
            isOpenModal: true 
        })
    }
    handleEditCategory = (item)=>{
        this.setState({
            isOpenEditNewsModal: true ,
            itemNew:item
        })
    }
    toggleNewsModal = ()=>{
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }
    toggleEditNewsModal = ()=>{
        this.setState({
            isOpenEditNewsModal: !this.state.isOpenEditNewsModal
        })
    }
    formatDate= (date)=>{
        const newFr = Moment(date).locale("vi", fr).format("DD/MM/YYYY HH:mm:ss");
        return newFr
    }
    handleDeleteCategory = async(id)=>{
        if(id){
            await  deleteNewsService(id)
            toast.success("Đã Xóa tin tức")
            this.getAllNews()
        }
    }
    render() {
        console.log(this.state.arrNews,"aks;dakds")
        let arrNews = this.state.arrNews

        return (
            <div className="container News-container">
                <ModalNews
                    isOpen = {this.state.isOpenModal}
                    test = {'abc'}
                    toggleFromParent = {this.toggleNewsModal}
                    createNewNews = {this.createNewNews}
                    loadNews = {this.getAllNews}
                />
                {this.state.isOpenEditNewsModal &&
                    <ModalEditNews
                    isOpen = {this.state.isOpenEditNewsModal}
                    toggleFromParent = {this.toggleEditNewsModal}
                    currentNews = {this.state.itemNew}
                    loadNews = {this.getAllNews}
                    

                />
                    
                }
            <div className='title text-center'> Read News</div>
            <div className='mx-2'>
                    <button className='btn btn-primary px-2' onClick={()=>this.handleAddNewNews()}> <i className='fas fa-plus px-2'></i>Add new News</button>
                </div>
            
            <div className='News-table mt-4 mx-2'>
               
            <table id="customers" class="ws-table-all">
                <tbody>
                    <tr>
                        <th style={{width:"250px"}}>Ảnh</th>
                        <th>Tiêu đề</th>
                        <th style={{width:"250px"}}>Ngày đăng</th>
                        <th style={{width:"170px"}}>Chỉnh sửa</th>
                    </tr>
                    {
                        arrNews && arrNews.map((item,index) =>{
                        return(
                            <>
                                <tr>
                                <td className="image" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                        {item.anhTinTuc&&
                                        <img  src={item.anhTinTuc}/> 
                                    }
                                    
                                    </td>
                                    
                                    <td>{item.tieuDe}</td>
                                    <td>{this.formatDate(item.createdAt)}</td>
                                   
                                    <td className='action'>
                                    <button onClick={()=>this.handleEditCategory(item)} class="btn btn-success mx-1 px-2 ">Edit</button>
                                    <button onClick={()=>this.handleDeleteCategory(item.id)} class="btn btn-danger  px-2">Delete</button>
                                    </td>
                                </tr>
                            </>
                        )
                         
                    })}
  
                </tbody>
            </table>
            </div>
        </div>
        )
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsManage);
