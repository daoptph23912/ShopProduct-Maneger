import React, { Component,useEffect  } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import ModalProducts from './ModalProducts';
import ModalEditProducts from './ModalEditProducts';
import { getAllProducts } from '../../../services/productsService';
import * as actions from '../../../store/actions'
import CurrencyFormat from 'react-currency-format';
import  './product.scss';
class ProductManage extends Component {

    constructor(props){
        super(props);
         
        this.state = {
            arrCategories: [],
            arrProducts: [],
            isOpenModal: false,
            isOpenEditProductsModal: false,
            productsEdit: {},
            currentPage:1,
            lenghtPage: [],
            totalProducts: 0,
            // currentPage: 1,
            pageSize: 5,
            arrSearch: [],
            search:""
            
        }
       }
     
    async componentDidMount() {
        
       
        this.props.fetchProducts(this.state.currentPage) 
   
        // this.setState({ orders, totalCount, currentPage: this.state.page });
    }
     
    handleAddNewProducts = ()=>{
        this.setState({
            isOpenModal: true
        })
    }
    toggleProductsModal = ()=>{
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }
    toggleEditProductsModal = ()=>{
        this.setState({
            isOpenEditProductsModal: !this.state.isOpenEditProductsModal
        })
    }
    componentDidUpdate(prevProps, prevState,snapshot) {
        //console.log(prevProps.productsRedux,'prevProps')
        if(prevProps.productsRedux !== this.props.productsRedux){
            console.log(this.props.productsRedux,"Ngueyenx")
            this.setState({
                arrProducts: this.props.productsRedux
            })
        }
        if(prevProps.categoriesRedux !== this.props.categoriesRedux){
            this.setState({
                arrCategories: this.props.categoriesRedux
            })
        } 
        
        if(prevProps.totalProducts !== this.props.totalProducts){
            
            let count = 0
            if(this.props.totalProducts){
                this.props.totalProducts.map((item)=>{
                    count = count + 1
                })
            }
           
            this.setState({
                totalProducts: count,
                arrSearch: this.props.totalProducts
            })
        }
        
    }
    price =(price)=>{
            var x = price;
            x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
            return  x;
    }
    handleDeleteProducts = (id)=>{
        if(id){
            console.log(id,"adflakf;akf;ahd;f")
            this.props.DeleteProducts(id,this.state.currentPage)
        }
    }
    handleEditProducts=(product)=>{
        this.setState({
            isOpenEditProductsModal: true,
            productsEdit: product,

        })
       
        
    }
    showImage = (image)=>{
        if(image){
           
            let list = JSON.parse(image)
           let url = ""
           for(let i = 0; i< list.length; i++){
                if(list[0]){
                    url = list[0]
                }
           }
           return url

        }
    }
    pageNext =()=>{
        this.props.fetchProducts(this.state.currentPage +1)
        this.setState({
            currentPage: this.state.currentPage +1
        })
    }
    pagePev = ()=>{
        this.props.fetchProducts(this.state.currentPage -1)
        this.setState({
            currentPage: this.state.currentPage -1
        })
    }
    timKiemSanPham = (event)=>{
            if(event.target.value){
                const newData = this.state.arrSearch.filter((item)=>{
                    const itemData = item.tenSp? item.tenSp.toUpperCase(): "".toUpperCase()
                    const textData = event.target.value.toUpperCase()
                    return itemData.indexOf(textData)> -1
                })
                if(newData){
                   
                    this.setState({
                        search: event.target.value,
                        arrProducts: newData

                    })
                }
            }else{
                this.setState({
                    search: event.target.value,
                    arrProducts: this.props.productsRedux

                })
            }
    }
     render() {
        
        console.log(this.state.totalProducts,"akdskd")
        const { orders, totalProducts, currentPage, pageSize } = this.state;
        const pageCount = Math.ceil(totalProducts / pageSize);
        this.showImage()
        let arrProducts = this.state.arrProducts;
        // arrProducts.forEach(item => {
        //     console.log(item.image,"dslaflk")
        // });
        let arrCategories = this.state.arrCategories;
        let count = 0
        arrProducts.map((item)=>{
            count++
        })
        let pageButtons = []
        for (let i = 1; i <= pageCount; i++) {
            pageButtons.push(
                <>{
                    i === currentPage?
                    <li class="page-item disabled">
                    <button class="page-link"
                    key={i}
                    onClick={() => {this.props.fetchProducts(i)
                        this.setState({
                            currentPage: i
                        })
                    }  }
                
                >
                {i}
              </button></li>
                    :
                    <li class="page-item ">
                    <button class="page-link"
                    key={i}
                    onClick={() => {this.props.fetchProducts(i)
                        this.setState({
                            currentPage: i
                        })
                    }  }
                
                >
                {i}
              </button></li>
                }
                 
                </>
               
              
            );
           
          }

         
        return (
            <div className="container products-container">
                <ModalProducts
                    isOpen = {this.state.isOpenModal}
                    test = {'abc'}
                    toggleFromParent = {this.toggleProductsModal}
                    createNewProducts = {this.createNewProducts}
                />
                {this.state.isOpenEditProductsModal &&
                    <ModalEditProducts
                    isOpen = {this.state.isOpenEditProductsModal}
                    toggleFromParent = {this.toggleEditProductsModal}
                    currentProducts = {this.state.productsEdit}
                    page = {this.state.currentPage}
                     
                />
                    
                }
                 
                <div className='title text-center'> Read Products</div>
                <div className='col-12' style={{display:"flex"}} >
                    <button className=' col-2 btn btn-primary px-2' onClick={()=>this.handleAddNewProducts()}> <i className='fas fa-plus px-2'></i>Add new products</button>
                    <div class="row mt-10 col-8">
                    <div class="col-md-5 mx-auto">
                        
                        <div class="input-group">
                            <input class="form-control  border" onChange={(event)=>this.timKiemSanPham(event)} type="search" value={this.state.search} placeholder='Tìm kiếm theo tên Sản phẩm' id="example-search-input"/>
                            <span class="input-group-append">
                                
                            </span>
                        </div>
                    </div>
                </div>
                </div>
                <div className='products-table mt-4 mx-2'>
                <table id="customers" class="ws-table-all px-5">
                    <tbody>
                        <tr>
                          
                            <th className='anh  '>Ảnh</th>
                            <th className='tenSp '>Tên sản phẩm</th>
                            <th className='danhMuc manhinhdienthoai tablet'>Danh Mục</th>
                            <th className='hangSX manhinhdienthoai tablet maytinh' >Hãng sx</th>
                            <th  className='gia manhinhdienthoai'>Giá</th>
                            <th className='soLuong manhinhdienthoai tablet maytinh'>soLuong</th>
                            <th  className='sale manhinhdienthoai tablet maytinh'>Sale</th>
                            <th className='hot manhinhdienthoai tablet maytinh'>Hot</th>
                            <th className='luotXem manhinhdienthoai tablet maytinh'>lượt xem</th>
                            <th className='luotMua manhinhdienthoai tablet maytinh'>lượt mua</th>
                            <th className='action'>Action</th>
                        </tr>
                        {
                        arrProducts && arrProducts.map((item,index) =>{
                        return(
                            <>

                                <tr>
                                    
                                    <td className="image" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                        {item.image&&
                                        <img  src={this.showImage(item.image)}/> 
                                    }
                                    
                                    </td>
                                    
                                    <td>{item.tenSp}</td>
                                    <td className="manhinhdienthoai tablet">
                                   { arrCategories && arrCategories.map((item2,index) =>{
                                        return(
                                            <>
                                                {item.idDanhSach&&item.idDanhSach === item2.id? item2.name :""}
                                            </>
                                            
                                        ) })}
                                    </td>
                                    <td  className="manhinhdienthoai tablet maytinh">{item.hangSx}</td>
                                    <td className="manhinhdienthoai">{this.price(item.giaSanPham)}</td>
                                    <td className="manhinhdienthoai tablet maytinh">{item.soLuong}</td>
                                    <td  className="manhinhdienthoai tablet maytinh">{item.sale+ " %"}</td>
                                    <td  className="manhinhdienthoai tablet maytinh">{item.hot === 1? <i class="fas fa-check"></i>: ''}</td>
                                    <td  className="manhinhdienthoai tablet maytinh">{item.luotXem}</td>
                                    <td className="manhinhdienthoai tablet maytinh">{item.luotMua}</td>
                                    <td className='action'>
                                    <button onClick={()=>this.handleEditProducts(item)} class="btn btn-success mx-1 px-2 ">Edit</button>
                                    <button onClick={()=>this.handleDeleteProducts(item.id)} class="btn btn-danger  px-2">Delete</button>
                                    </td>
                                </tr>
                            </>
                        )
                         
                    })}
                    
                    
                  
                        
                        
                    </tbody>
                    </table>
                    <div className='pagination ' style={{marginTop:"10px"}}>
                   
                    
                    
                    <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                            {this.state.currentPage === 1?
                                 <li class="page-item disabled">
                                 <button class="page-link" tabindex="-1">Previous</button>
                                 </li>
                            :
                            <li class="page-item ">
                                 <button class="page-link"  onClick={() =>this.pagePev()} >Previous</button>
                                 </li>
                            }
                            {pageButtons}
                            
                            {count < 5?
                                 <li class="page-item disabled">
                                 <button class="page-link">Next</button>
                                 </li>
                            :   
                                <li class="page-item ">
                                 <button class="page-link" onClick={() => this.pageNext()}>Next</button>
                                 </li>
                            }
                           
                        </ul>
                    </nav>
                </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
   
    return {
        productsRedux: state.admin.products,
        totalProducts: state.admin.totalProducts,
        categoriesRedux: state.admin.categories,
        allProducts: state.admin.allProducts,
        // categorietotalProductssRedux: state.admin.totalProducts,
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCategoriesStart: ()=> dispatch(actions.fetchCategoriesStart()),
        fetchProducts: (page)=> dispatch(actions.fetchProducts(page)),
        DeleteProducts: (id,page)=> dispatch(actions.DeleteProducts(id,page)),   
        fetchAllProducts: ()=> dispatch(actions.fetchAllProducts()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
