import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import Moment from 'moment';
import vi from "moment/locale/vi";
import fr from "moment/locale/fr";
import {thongKeOrders} from "../../../../src/services/OrdersService"
import { parseInt } from 'lodash';
class ThongKeManage extends Component {

    constructor(props) {
        super(props);
        var today = new Date(),
         dateThang =  ('0' + (today.getMonth() + 1)).slice(-2),
        dateNgay = ('0' + today.getDate()).slice(-2),
        dateNam = (today.getFullYear())
        this.state = {
            arrOrders: [],
            arrCarts:[],
            arrProducts:[],
            thang:dateThang,
            arrMembers:[],
            arrList : [],
            doanhThu:0,
            ngay:dateNgay,
            ngayThangNam: "",
            denNgayThangNam: "",
            arrThongKeProducts: [],
            chonThongKe: 1, 
            denNam: dateNam,
            chonNgay: `${dateNgay}/${dateThang}/${dateNam}`,
            hienThiNgay: `${dateNam}/${dateThang}/${dateNgay}`,
        }
    }
    getChonNgay = async() =>{
        
       let ngay = this.state.hienThiNgay
       ngay.replace(/\//g, '-');
        let data = {
            key : 1,
            ngay: ngay
        }
        let arrThongKe =  await thongKeOrders(data)
        if(arrThongKe.errCode === 0){
             console.log(arrThongKe.result)
             this.setState({
                 arrThongKeProducts: arrThongKe.result
             })
        }
    }
    async componentDidMount() {
        this.props.fetchOrderProducts()  
        this.props.fetchProducts()  
        this.getChonNgay()
    }
    handleOnChageInput = async(event) => {
        let data = {
            key: 0,
            nam: parseInt(this.state.denNam),
            thang: parseInt(event.target.value)
        }
        this.setState({
            thang: event.target.value
        })
        let arrThongKe =  await thongKeOrders(data)
        if(arrThongKe.errCode === 0){
            console.log(arrThongKe.result)
            this.setState({
                arrThongKeProducts: arrThongKe.result,
                
            })
       }
        
    }

    handleOnChageInputDenNgay=(event)=>{
        let denNgay = event.target.value
        denNgay.replace(/\//g, '-');
        this.setState({
            denNgayThangNam : denNgay
         })
    }
    handleOnChageInputNgay = (event)=>{
        let tuNgay = event.target.value
        tuNgay.replace(/\//g, '-');
        this.setState({
            ngayThangNam : tuNgay
         })
    }
    showImage = (id)=>{
        let url = ""
        let arrImage = ""
        let arrProducts =  this.state.arrProducts
        arrProducts&&arrProducts.map((item)=>{
           
            if(id === item.id){
                arrImage = item.image
            }
        })
        if(arrImage){
           
            let list = JSON.parse(arrImage)
          
           for(let i = 0; i< list.length; i++){
                if(list[0]){
                    url = list[0]
                }
           }
           

        }
        return url
    }
    formatDayMonYear = ()=>{
        let date = this.state.ngayThangNam.split("-")
      
        const year = date[0];
        const month = date[1];
        const day = date[2];
        console.log(`Ngày: ${day}, Tháng: ${month}, Năm: ${year}`);
    }
     arrOrdersThang = ()=>{
        
        let tien = 0
        this.state.arrThongKeProducts.map((item)=>{
            tien = tien + parseInt(item.tongPrice)
        })
        tien = tien.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        return tien
    }
    formatDate= (date)=>{
        const newFr = Moment(date).locale("vi", fr).format("MM");
        return parseInt(newFr)
    }
    formatDateNgay= (date)=>{
        const newFr = Moment(date).locale("vi", fr).format("DD");
        return parseInt(newFr)
    }
    formatDateNam= (date)=>{
        const newFr = Moment(date).locale("vi", fr).format("YYYY");
        return parseInt(newFr)
    }
    
    componentDidUpdate(prevProps, prevState,snapshot) {
       
       
        if(prevProps.ordersRedux !== this.props.ordersRedux){
            this.setState({
                arrOrders: this.props.ordersRedux
            })
        }
        if(prevProps.cartsRedux !== this.props.cartsRedux){
            this.setState({
                arrCarts: this.props.cartsRedux
            })
        }
        if(prevProps.productsRedux !== this.props.productsRedux){
            this.setState({
                arrProducts: this.props.productsRedux
            })
        }
        if(prevProps.members !== this.props.members){
            this.setState({
                arrMembers: this.props.members
            })
        }
        
    }
    clickHear = async()=>{
        let data = {
            key : 2,
            tuNgay: this.state.ngayThangNam,
            denNgay: this.state.denNgayThangNam
        }

        

       let arrThongKe =  await thongKeOrders(data)
       if(arrThongKe.errCode === 0){
            console.log(arrThongKe.result)
            this.setState({
                arrThongKeProducts: arrThongKe.result
            })
       }
    }
    gettenSanPham = (id)=>{
        let tenSP = ""
        let arrProducts =  this.state.arrProducts
        arrProducts&&arrProducts.map((item)=>{
           
            if(id === item.id){
                tenSP = item.tenSp
            }
        })
        console.log()
        return tenSP
    }
    giaBan
    price =(price)=>{
        var x = parseInt(price);
        x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
       
        return  x;
}
    giaTienSanPham = (id)=>{
        let giaTien = 0
         let arrProducts =  this.state.arrProducts
          arrProducts&&arrProducts.map((item)=>{
           
            if(id === item.id){
                if(item.sale >0){
                    giaTien = item.giaSanPham - (item.giaSanPham*item.sale/100)
                }else{
                    giaTien = item.giaSanPham
                }
            }
        })
        giaTien = giaTien.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        return giaTien
    }
    tienLaiSanPham  = ()=>{
        let tienLai = 0
        let arrtienLai = []
        let tongTienGoc = 0
        let tongDoanhThu = 0
        let arrProducts =  this.state.arrProducts
        arrProducts&&arrProducts.map((products)=>{
            this.state.arrThongKeProducts.map((thongKe)=>{
                if(thongKe.ipSanPham === products.id){
                    tongTienGoc = tongTienGoc + (products.giaNhap * thongKe.tongSoLuong)   
                }
            })
           
        })
        this.state.arrThongKeProducts.map((thongKe)=>{
            tongDoanhThu = tongDoanhThu + parseInt(thongKe.tongPrice)
        })
        console.log(tongDoanhThu)
        tienLai = tongDoanhThu - tongTienGoc
        return tienLai.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    }
    handleChonThongKe = (event)=>{
   
        this.setState({
            chonThongKe : parseInt(event.target.value)
        })

    }
    handleOnChageInputChonNgay = async(event)=>{
        let ngay = event.target.value
        ngay.replace(/\//g, '-');
        let data = {
            key : 1,
            ngay: ngay
        }
        this.setState({
            chonNgay: event.target.value
        })
        let arrThongKe =  await thongKeOrders(data)
        if(arrThongKe.errCode === 0){
             console.log(arrThongKe.result)
             this.setState({
                 arrThongKeProducts: arrThongKe.result
             })
        }
    }
    render() {
        console.log(this.state.chonNgay,"akd;akda")
        let arrThongKe = this.state.arrThongKeProducts
        let tongSoTien = this.state.doanhThu
        let arrProductsOrders = []
        let chonThongKe = this.state.chonThongKe
        console.log(chonThongKe)
        return (
            <div className="container category-container">
            <div className='title text-center'> Thống kê</div>
            <div className='col-12 ' style={{display:"flex"}}> 
            <div className='col-2'>
                <select name="roleID" class="form-control" onChange={(event)=>this.handleChonThongKe(event)} value={this.state.chonThongKe}>
                        <option  value="0">Thống kê theo tháng</option>
                        <option selected value="1">Thống kê theo ngày</option>
                        <option value="2">Từ ngày ... Đến ngày</option>
                    </select>
                </div>
                {chonThongKe === 0 &&
                    <div className='col-3'>
                    <select name="roleID" class="form-control" style={{marginLeft:"10px"}} onChange={(event)=>this.handleOnChageInput(event)} value={this.state.thang}>
                            <option selected value="">----</option>
                            <option value="01">tháng 1</option>
                            <option value="02">tháng 2</option>
                            <option value="03">tháng 3</option>
                            <option value="04">tháng 4</option>
                            <option value="05">tháng 5</option>
                            <option value="06">tháng 6</option>
                            <option value="07">tháng 7</option>
                            <option value="08">tháng 8</option>
                            <option value="09">tháng 9</option>
                            <option value="10">tháng 10</option>
                            <option value="11">tháng 11</option>
                            <option value="12">tháng 12</option>
                        </select>
                    </div>
                }
                {chonThongKe === 2 &&
                    <div className='col-10'  style={{display:"flex", marginLeft:"10px"}}>
                    <div className='col-4' style={{display:"flex", alignItems:"center"}}>
                        <label className='col-3'>Từ ngày: </label>
                        <input type='date' className='form-control' onChange={(event)=>this.handleOnChageInputNgay(event)} value={this.state.ngayThangNam}/>
                    </div> 
                    <div className='col-4' style={{display:"flex", alignItems:"center", marginLeft:"10px"}}>
                    <label className='col-3'>Đến ngày: </label>
                        <input type='date' className='form-control' onChange={(event)=>this.handleOnChageInputDenNgay(event)} value={this.state.denNgayThangNam}/>
                    </div>
                    <div className='col-2'>
                        <button onClick={()=>this.clickHear()} className='btn btn-success 'style={{width:"140px", marginLeft:"10px"}}>Click</button>
                    </div>
                </div>

                }
                 {chonThongKe === 1 &&
                    <div className='col-10'  style={{display:"flex", marginLeft:"10px"}}>
                    <div className='col-4' style={{display:"flex", alignItems:"center"}}>
                        <label className='col-3'>Chọn ngày: </label>
                        <input type='date' className='form-control' onChange={(event)=>this.handleOnChageInputChonNgay(event)} value={this.state.chonNgay?this.state.chonNgay.toString():""}/>
                    </div> 
                   
                </div>

                }
                
                    
                   
            </div>
            
            <div className='category-table mt-4 mx-2'>
                <div>
                    <p>
                        Tổng doanh thu: <span style={{color:"red",fontWeight:"600"}}> { this.arrOrdersThang()}</span> 
                    </p>
                    <p>
                        Lợi nhuận: <span style={{color:"red",fontWeight:"600"}}> { this.tienLaiSanPham()}</span> 
                    </p>
                    
                </div>
            <table id="customers" class="ws-table-all">
                <tbody>
                    <tr>
                        <th style={{width:"200px"}}>Ảnh Sản phẩm</th>
                        <th>Tên Loại sản phẩm</th>
                        <th>Giá tiền</th>
                        <th>Đã bán</th>
                        <th>doanh thu</th>
                    </tr>
                    {arrThongKe&& arrThongKe.map((item)=>{
                        return(
                            <tr>
                                 <td className="image" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                        {item.ipSanPham&&
                                        <img style={{maxWidth:"100px"}}  src={this.showImage(item.ipSanPham)}/> 
                                    }
                                    
                                    </td>
                                <td>
                                    
                                    {this.gettenSanPham(item.ipSanPham)}
                                </td>
                                <td style={{color: "red"}}>
                                    {this.giaTienSanPham(item.ipSanPham)}
                                </td>
                                <td>
                                    {item.tongSoLuong}
                                </td>
                                <td style={{color: "red"}}>
                                    {this.price(item.tongPrice)}
                                </td>
                            </tr>
                        )
                    })}
                   
                    
  
                </tbody></table>
            </div>
        </div>
            )
    }

}

const mapStateToProps = state => {
    console.log(state.admin.allProducts,"a';'dlfa")
    return {
        ordersRedux: state.admin.orders,
        cartsRedux: state.admin.carts,
        productsRedux: state.admin.allProducts,
        members: state.admin.members,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOrderProducts: ()=> dispatch(actions.fetchOrderProducts()),
        fetchProducts: ()=> dispatch(actions.fetchAllProducts()),
        fetchMembers: ()=> dispatch(actions.fetchMembers()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThongKeManage);
