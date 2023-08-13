import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
// import { map } from 'lodash';
import ModalCategory from './ModalCategory';
import ModalEditCategory from './ModalEditCategory';
import { getAllUCategories,createNewCategories,deleteCategoriesService,editCategoriesService } from '../../services/categoriesService';
import {emitter} from '../../utils/emitter'
// import { getAllProducts } from '../../services/productsService';
class Categories extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            arrCategories: [],
            arrCategories2: [],
            isOpenModal: false,
            isOpenEditCategoryModal: false,
            categoryEdit: {}
        }
       }

   
    async componentDidMount() {
        await this.getAllCategoryfromReact();
        
     }
     handleAddNewCategory = ()=>{
        this.setState({
            isOpenModal: true
        })
    }
    toggleCategoryModal = ()=>{
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }
    toggleEditCategoryModal = ()=>{
        this.setState({
            isOpenEditCategoryModal: !this.state.isOpenEditCategoryModal
        })
    }
     getAllCategoryfromReact = async()=>{
        let response = await getAllUCategories();
       
       
         this.setState({
            arrCategories: response.data,
          
         }) 
        
        
    }
   
    handleDeleteCategory = async(id)=>{
        try {
            let response = await deleteCategoriesService(id);
            if(response.errCode !== 0 && response){
                alert(response.errMessage)
            }else{
                await this.getAllCategoryfromReact()
            }
        } catch (error) {
            console.log(error)
        }
        

    }
    createNewCategories = async(data)=>{
        
        try {
           let response = await createNewCategories(data)
           console.log(response, "adfadfaf")
           
           if(response.errCode !== 0 && response){
            alert(response.errMessage)
           }else{
            await this.getAllCategoryfromReact()
            this.setState({
                isOpenModal: false
            })
            emitter.emit("EVENT_CLERA_MODAL_DATA")
           }
        } catch (error) {
            console.log(error)
        }
       
        
    }
    handleEditCategory = (category)=>{
        this.setState({
            isOpenEditCategoryModal: true,
            categoryEdit: category
        })
        
    }
    doEditCategory = async(category)=>{
        try {
            await editCategoriesService(category);
            let response = await editCategoriesService(category);
            if(response.errCode === 0 && response){
                this.setState({
                    isOpenEditCategoryModal: false,
                })
                await this.getAllCategoryfromReact()
            }else{
                alert(response.errMessage)
            }
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        let arrCategories  = this.state.arrCategories
        console.log(arrCategories)
        return (
            <div className="container category-container">
                <ModalCategory
                    isOpen = {this.state.isOpenModal}
                    test = {'abc'}
                    toggleFromParent = {this.toggleCategoryModal}
                    createNewCategories = {this.createNewCategories}
                />
                {this.state.isOpenEditCategoryModal &&
                    <ModalEditCategory
                    isOpen = {this.state.isOpenEditCategoryModal}
                    toggleFromParent = {this.toggleEditCategoryModal}
                    currentCategory = {this.state.categoryEdit}
                     EditCategory = {this.doEditCategory}
                />
                    
                }
                 
                <div className='title text-center'> Read Category</div>
                <div className='mx-2'>
                    <button className='btn btn-primary px-2' onClick={()=>this.handleAddNewCategory()}> <i className='fas fa-plus px-2'></i>Add new category</button>
                </div>
                <div className='category-table mt-4 mx-2'>
                <table id="customers" class="ws-table-all">
                    <tbody>
                        <tr>
                            <th>id</th>
                            <th>Tên Loại sản phẩm</th>
                            <th>Action</th>
                        </tr>
                        {
                        arrCategories && arrCategories.map((item,index) =>{
                        return(
                            <>
                                <tr>
                                    <td>{item.id}</td>
                                    
                                    <td>{item.name}</td>
                                   
                                    <td className='action'>
                                    <button onClick={()=>this.handleEditCategory(item)} class="btn btn-success mx-1 px-2 ">Edit</button>
                                    <button onClick={()=>this.handleDeleteCategory(item.id)} class="btn btn-danger  px-2">Delete</button>
                                    </td>
                                </tr>
                            </>
                        )
                         
                    })}
                    
                    
                  
                        
                        
                    </tbody></table>
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

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
