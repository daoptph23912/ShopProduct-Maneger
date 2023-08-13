import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {emitter} from '../../../utils/emitter';
import {CommonUtils} from '../../../utils';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getAllMembers } from '../../../services/membersService';
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import _ from 'lodash';
import  './product.scss';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios  from "../../../axios";
import Moment from 'moment';
import vi from "moment/locale/vi";
import fr from "moment/locale/fr";

class ModalEditOrder extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            idUser:"",
            idCart:[],
            tongTien:0,
            createdAt:"",
            lisProduts: [], 
            status: 0,
            idOrder: 0
            
           

        }
       

    }
 
    getAllCategoryfromReact = async()=>{

        
        
    }
    async componentDidMount () {
    let itemEditOrders = this.props.itemEditOrder
    
    if(itemEditOrders&&!_.isEmpty(itemEditOrders))
       this.setState({
            idUser: itemEditOrders.idUser,
            tongTien: itemEditOrders.tongTien,
            createdAt: itemEditOrders.createdAt,
            status: itemEditOrders.status,
            idOrder: itemEditOrders.id,
           
            idCart:JSON.parse(itemEditOrders.idCart),
            
       })
       
       
     
    }
    
    toggle = () => {
        
        this.props.toggleFromParent()
    }
    handleOnChageInput = (event, id) => {
       
        
    }
    checkValidateInput = ()=>{
      
    }
    handleAddNewMembers = () => {
       
       
    }
    componentDidUpdate(prevProps, prevState,snapshot) {
        // if(prevProps.categoriesRedux !== this.props.categoriesRedux){
        //     this.setState({
        //         arrCategories2: this.props.categoriesRedux
        //     })
        // }
    }
   
    handleImage2 =async (even)=>{
    }
    
    openImage = () => {
        if (this.state.privewImageUrl){
            this.setState({
                isOpenImage: true
            })
           
        }
       
    }
    CheckInput = ()=>{
       
    }
     nameMembers = ()=>{
        let name = ""
        let idUser = this.state.idUser
        let arrMembers = this.props.arrMembers
        arrMembers.map((item)=>{
            if(idUser===item.id){
                name = item.tenThanhVien
            }
        })
        
        return name
    }
    readInfoUser = ()=>{
        
    }
    phoneMembers = ()=>{
        let phone = ""
        let idUser = this.props.itemEditOrder.idUser
        let arrMembers = this.props.arrMembers
       arrMembers.map((item)=>{
            if(idUser===item.id){
                phone = item.soDienThoai
            }
        })
        
        return phone
    }
    emailMembers = ()=>{
        let email = ""
        let idUser = this.props.itemEditOrder.idUser
        let arrMembers = this.props.arrMembers
       arrMembers.map((item)=>{
            if(idUser===item.id){
                email = item.email
            }
        })
        
        return email
    }
    addressMembers = ()=>{
        let diaChi = ""
        let idUser = this.props.itemEditOrder.idUser
        let arrMembers = this.props.arrMembers
       arrMembers.map((item)=>{
            if(idUser===item.id){
                diaChi = item.diaChi
            }
        })
        
        return diaChi
    }
    formatDate= (date)=>{
        const newFr = Moment(date).locale("vi", fr).format("DD/MM/YYYY HH:mm:ss");
        return newFr
    }
    price =(price)=>{
        let x = price;
        x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        return  x;
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
    getSize = (arr,id)=>{
        let size = ""
        arr.map((item)=>{
            if(item.ipSanPham === id){
                size = item.size
            }
        })
        
        return(
            size
        )
    }
    getSoLuong = (arr,id)=>{
        let soLuong = 0
        arr.map((item)=>{
            if(item.ipSanPham === id){
                soLuong = item.soLuong
            }
        })
       
        return(
            soLuong
        )
    }
    listOrderCart = ()=>{
        let idSp = []
        let products = []
        if(this.state.idCart){
        this.state.idCart.map((item)=>{
            if(this.props.arrCarts){
                this.props.arrCarts.map((item2)=>{
                    if(item === item2.id){
                        idSp.push(item2)
                    }
                }) 
            }
           
        })
    }
        console.log(idSp,"asd;aks;dk")
        idSp.map((item)=>{
            this.props.arrProducts.map((product)=>{
                if(item.ipSanPham == product.id){
                    products.push(product) 
                }
            })
        })
       return (products.map((item)=>{
            return (
                <div className='col-12'  style={{
                    display:"flex",borderBottomWidth:"1px",borderBottomStyle:"solid " ,borderBottomColor:"#000", padding:"10px", marginBottom:"10px"
                    
                    
                }}>
                    <div style={{width:"30%"}}> 
                        <img style={{width:"150px" }} src={this.showImage(item.image)}/>
                    </div>
                    <div style={{width:"70%"}}>
                        <p style={{fontSize:"20px",textAlign:"left",fontWeight:"700"}}>{item.tenSp}</p>
                        
                                
                                <div style={{ display:"flex", justifyContent:"space-between"}}>
                                {item.sale <=0?
                                     <span style={{
                                        fontSize: "15px",
                                        fontWeight: '600',
                                        color: 'red'
                                    }}>
                                        
                                        {this.price(item.giaSanPham) }
                                    </span>
                                    :
                                    <div style={{display:'flex', marginLeft:4
                                   
                                   
                                }}>
                                     <span style={{
                                        fontSize: "14px",
                                        fontWeight: '600',
                                        color: '#696969',
                                        textDecorationLine:'line-through'
                                    }}>
                                    
                                    {this.price(item.giaSanPham ) }
                                </span>
                                   
                                <span style={{
                                    fontSize:"15px",
                                    marginLeft:5,
                                    marginRight:5
                                }}>-</span>
                                <span style={{
                                        fontSize: "15px",
                                        fontWeight: '600',
                                        color: '#B22222',
                                       
                                    }}>
                                    
                                    {this.price(item.giaSanPham-(item.giaSanPham *(item. sale/100)) ) }
                                </span>
                                </div>
                            }
                                </div>
                                <div>
                                <span style={{
                                        fontSize: "15px",
                                        fontWeight: '600',
                                        color: '#000',
                                       
                                    }}>Size: {this.getSize(idSp,item.id)}</span>
                                </div>
                                <div>
                                <span style={{
                                        fontSize: "15px",
                                        fontWeight: '600',
                                        color: '#000',
                                       
                                    }}>Số lượng: x{this.getSoLuong(idSp,item.id)}</span>
                                </div>
                               
                              
                            
                    </div>
                    
                </div>
            )
       }))
        
    }
    tongSoSanPham =()=>{
        let list = this.state.idCart
      let count = 0
        list.map((item)=>{
            this.props.arrCarts.map((item2,inbiex)=>{
                if(item === item2.id){
                    count = count+1
                }
            }) 
        })
        return count
    }
    handleHuyDon = ()=>{
       
        this.props.HuyOrderCart({
            id: this.state.idOrder,
            arrCarts:JSON.stringify(this.state.idCart),
            idUser: this.state.idUser,
            tongTien: this.state.tongTien,
            status: this.props.status
        })
        this.toggle()
    }
    handleXacNhanDatDon = ()=>{
        console.log(this.props.status.status)
        this.props.checkOrderCart({
            id: this.state.idOrder,
            arrCarts:JSON.stringify(this.state.idCart),
            idUser: this.state.idUser,
            status: this.props.status
            
        })
        this.toggle()
    }
    handleEditMembers = (id,status)=>{
        if(id&&status){
            this.props.giaoOrderCart({
                id: id,
                status: status,
                statuss: this.props.status
                
            })
            this.toggle()
        }
        
    }
    render() {  
       
        return (
            
        <Modal 
         isOpen={this.props.isOpen}
         toggle={()=>this.toggle()}
         className={"modalConttailer"}
         size= 'lg'
         centered 
         >
            <ModalHeader toggle={()=>this.toggle()}>Create New Members</ModalHeader>
                <ModalBody style={{maxHeight: '750px',
                overflow: 'auto'}}>
                    <div className='container'>
                        <div className=''></div>
                        <div className='col-md-12'>
                            <div className='col-12' style={{fontWeight:"bold", fontSize:"27px", borderBottomWidth:"1px",borderBottomStyle:"solid " ,borderBottomColor:"#000",padding:"5px",margin:"0px 0px 10px 0px"}}>
                                <p style={{margin:0}}>Thông tin người nhận</p>
                            </div>
                                <div className='info-order'>
                                    <div className='' style={{display:"flex",width:"100%"}}>
                                        <label style={{width:"20%",fontWeight:"bold"}}>Tên người nhận: </label>
                                        <p >{this.nameMembers()}</p>
                                    </div>
                                    <div className='' style={{display:"flex",width:"100%"}}>
                                        <label style={{width:"20%",fontWeight:"bold"}}>Số điện thoại: </label>
                                        <p >{this.phoneMembers()}</p>
                                    </div>
                                    <div className='' style={{display:"flex",width:"100%"}}>
                                        <label style={{width:"20%",fontWeight:"bold"}}>Email: </label>
                                        <p >{this.emailMembers()}</p>
                                    </div>
                                    <div className='' style={{display:"flex",width:"100%"}}>
                                        <label style={{width:"20%",fontWeight:"bold"}}>Địa chỉ nhận: </label>
                                        <p >{this.addressMembers()}</p>
                                    </div>
                                    <div className='' style={{display:"flex",width:"100%"}}>
                                        <label style={{width:"20%",fontWeight:"bold"}}>Tổng tiền: </label>
                                        <p style={{color:"red"}}>{this.price(this.state.tongTien)}</p>
                                    </div> 
                                    <div className='' style={{display:"flex",width:"100%"}}>
                                        {this.state.status ==2||this.state.status ==3?
                                            <><label style={{width:"20%",fontWeight:"bold"}}>Ngày giao: </label>
                                            <p>{this.formatDate(this.state.updatedAt)}</p></>
                                            :
                                            <><label style={{width:"20%",fontWeight:"bold"}}>Ngày đặt: </label>
                                            <p>{this.formatDate(this.state.createdAt)}</p></>
                                        }
                                       
                                    </div> 
                                    <div className='' style={{display:"flex",width:"100%"}}>
                                        <label style={{width:"20%",fontWeight:"bold"}}>Trạng thái: </label>
                                        <span style={{fontWeight:"600",color:this.state.status == 0 ? "#FF9900" : this.state.status == 1 ? "#0099FF" : this.state.status == 2 ? "#008B8B" : this.state.status == 3 ? "#006400" :this.state.status == 4?"#FF6347":"#8B0000"}}>
                                        {this.state.status == 0 ? "Đang chờ xử lý" : this.state.status == 1 ? "Đã xác nhận đơn hàng" : this.state.status == 2 ? "Đơn đang giao" : this.state.status == 3 ? "Giao thành công"  :this.state.status == 4?"Chờ xác nhận hủy đơn ":"Đã hủy thành công"}</span>
                                    </div>    
                                        
                                </div>
                        </div>
                        <div className='col-md-12'>
                            <div className='col-12' style={{fontWeight:"bold", fontSize:"27px", borderBottomWidth:"1px",borderBottomStyle:"solid " ,borderBottomColor:"#000",padding:"5px",margin:"10px 0px 10px 0px"}}>
                                <p style={{margin:0}}>Thông tin Đơn hàng</p>
                                
                            </div>
                            {this.listOrderCart()}
                            <div style={{justifyContent:"space-between", display:"flex"}}>
                                <div>
                                    <span style={{fontSize:"17px", fontWeight:"bold"}}>Số lượng hàng đặt: {this.tongSoSanPham()}</span>
                                </div>
                                <div>
                                <label style={{fontWeight:"bold", fontSize:"20px"}}>Tổng tiền: <span style={{color:'red'}}>{this.price(this.state.tongTien)}</span></label>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                  
                    
                </ModalBody>
                <ModalFooter>
                {
                   this.state.status === 0 && <Button color="warning" className='px-2' onClick={()=>this.handleEditMembers(this.state.idOrder,1)}>  Xác nhận đơn </Button>
                 
               
                }{' '}
                 {
                   this.state.status === 1 && <Button color="info" className='px-2' onClick={()=>this.handleXacNhanDatDon()}>   Giao đơn </Button>
                 
               
                }{' '}
                {
                   this.state.status === 2 && <Button color="info" className='px-2' onClick={()=>this.handleEditMembers(this.state.idOrder,3)}>   Đã giao tới khách </Button>
                 
               
                }{' '}
                 {
                   this.state.status === 4 &&  <Button color="success" className='px-2' onClick={()=>this.handleHuyDon()}>
                   Xác Nhận Hủy Đơn
               </Button>
                 
               
                }
               {' '}
               
                <Button color="danger" className='px-2' onClick={()=>this.toggle()}>
                    Cancel
                </Button>

            </ModalFooter>
        </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
        // categoriesRedux: state.admin.categories,
        // isLoading: state.admin.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
        HuyOrderCart: (data)=> dispatch(actions.HuyOrderCart(data)),
        checkOrderCart: (data)=> dispatch(actions.checkOrderCart(data)),
        giaoOrderCart: (data)=> dispatch(actions.giaoOrderCart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditOrder);




