import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import axios  from "../../../axios";


class ModalMembers extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isOpenImage: false,
            anhDaiDien:"",
            tenThanhVien: "",
            email: "",
            gioiTinh:"",
            soDienThoai:"",
            matKhau:""

        }
       

    }
 
    getAllCategoryfromReact = async()=>{
        // let response = await getAllMembers();

        //  this.setState({
        //     arrCategories: response.categories
        //  }) 
        
        
    }
    async componentDidMount () {
       
    //    this.props.getCategoriesStart()
     
    }
    toggle = () => {
        this.setState({
            file:[]
        })
        this.props.toggleFromParent()
    }
    handleOnChageInput = (event, id) => {
        // console.log(event.target.value,id)
        let copyState = {...this.state}
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
        
    }
    checkValidateInput = ()=>{
        let isValid = true;
        let arrInput = ['anhDaiDien','tenThanhVien','email','gioiTinh','soDienThoai','matKhau']
        for (let i = 0; i < arrInput.length;i++){
            if(!this.state[arrInput[i]]){
                isValid  = false;
                alert(arrInput[i]+ ' không được bỏ trống')
                break;
            }
           
        }
        return isValid
    }
    handleAddNewMembers = () => {
        let isValid = this.checkValidateInput()
        if(isValid === true) {
            this.props.createNewMember({
                anhDaiDien: this.state.anhDaiDien,
                tenThanhVien: this.state.tenThanhVien,
                email: this.state.email,
                gioiTinh: this.state.gioiTinh,
                soDienThoai: this.state.soDienThoai,
                matKhau: this.state.matKhau,
                diaChi: this.state.diaChi,
                

            })
            this.setState({
                anhDaiDien: "",
                tenThanhVien:"",
                email:"",
                gioiTinh: "",
                soDienThoai:"",
                matKhau:"",
            })
           
            
            this.props.toggleFromParent()
        }
       
    }
    componentDidUpdate(prevProps, prevState,snapshot) {
      
    }
   
    handleImage2 =async (even)=>{
        const COUND_NAME = 'djh5ubzth'
        const PRESET_NAME = 'b6oxas4h'
        const FOLDER_NAME = 'UploadFileMember'
        const url = ""
        const data = even.target.files[0];
        const api = `https://api.cloudinary.com/v1_1/${COUND_NAME}/image/upload`
        const fromData = new FormData();
        
         const checkfile = 0   
        
       if(data){
                fromData.append('upload_preset',PRESET_NAME)
                fromData.append("folder",FOLDER_NAME)
                fromData.append('file',data)
            
                await axios.post(api,fromData,{
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) =>{
                        this.setState({
                            anhDaiDien: res.secure_url
                           })      
            })
       }
      
       
        
    }
    
    openImage = () => {
        if (this.state.privewImageUrl){
            this.setState({
                isOpenImage: true
            })
           
        }
       
    }
    
  
    DeleteImage=(image)=>{
        if(image){
          
           this.setState({
                anhDaiDien: ""
           })
           
           
        }
    }
    render() {  
        
        let url = ""
       if(this.state.anhDaiDien){
        url = this.state.anhDaiDien
       }
       console.log(this.state.anhDaiDien,"á;ad;d")
        return (
            
        <Modal 
         isOpen={this.props.isOpen}
         toggle={()=>this.toggle()}
         className={"modalConttailer"}
         size= 'lg'
         centered 
         >
            <ModalHeader toggle={()=>this.toggle()}>Create New Members</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        
                        <div className=''>
                            <div className='col-12 row mg-top'>
                                <div className='col-6 form-group'>
                                    <label>Họ và tên</label>
                                    <input type="text" className="form-control" placeholder='Nhập tên' onChange={(event)=>this.handleOnChageInput(event,'tenThanhVien')} name="tenThanhVien" value={this.state.tenThanhVien}/>
                                </div>
                                <div className='col-6 form-group '>
                                    <label>Email</label>
                                    <input type="text" className="form-control" placeholder='Nhập email' onChange={(event)=>this.handleOnChageInput(event,'email')} name="email" value={this.state.email}/>
                                </div>
                            </div> 
                            <div className='col-6 form-group '>
                                    <label>Mật khẩu</label>
                                    <input type="text" className="form-control" placeholder='Nhập Mật khẩu' onChange={(event)=>this.handleOnChageInput(event,'matKhau')} name="matKhau" value={this.state.matKhau}/>
                                </div>
                            
                            <div className=' col-12 row'>
                                <div className='col-3 form-group  mg-top'>
                                <label for="inputState">Giới tính</label>
                                         <select name="roleID" class="form-select" onChange={(event)=>this.handleOnChageInput(event,'gioiTinh')} value={this.state.gioiTinh}>
                                         <option selected  value="0">---- Chọn giới tính -----</option>
                                            <option  value="1">Nam</option>
                                            <option  value="2">Nữ</option>
                                            <option  value="3">Khác</option>
                                         </select>  
                                </div>
                                <div className='col-3 form-group mg-top'>
                                <label>Số điện thoại</label>
                                <input type="text" className="form-control" placeholder='Nhập số điện thoại' onChange={(event)=>this.handleOnChageInput(event,'soDienThoai')} name="soDienThoai" value={this.state.soDienThoai}/>
                                
                            </div>
                            <div className='col-6 form-group mg-top'>
                                <label>Địa chỉ</label>
                                <input type="text" className="form-control" placeholder='Nhập tên loại sản phẩm' onChange={(event)=>this.handleOnChageInput(event,'diaChi')} name="name" value={this.state.diaChi}/>
                            </div>
                           
                            </div>
                            <div className='col-12'>
                                    <div className='col-6'>

                                    </div>
                            </div>
                            <div className=' col-12 row'>
                                <div className='col-3 form-group mg-top'>
                                    <label>Ảnh</label>
                                    <div className='upload-image'>
                                        <label htmlFor='taianh' className='text_image'>Tải ảnh <i class="fas fa-upload"></i></label>
                                        <input id='taianh' hidden type="file" onChange={(e)=>this.handleImage2(e,"image")} multiple />
                                    </div>
                                    
                                </div>
  
                            </div>
                            {url&&
                            <>
                                 <div className='flex  col-12 flexNewEdit ' >
                             
                             <div className='col-md-4 col-sm-12 ' style={{position:"relative",marginTop:'10px'}} >
                                 <img style={{ maxWidth:'230px'}} onClick={()=>this.openImage()} src={url}/>
                                 <span onClick={()=>this.DeleteImage(url)} className='p-2 cursor-pointer hover:bg-gray-400' style={{   
                                     position: 'absolute',
                                     cursor: "pointer",
                                     right:'0%',
                                     top: '-7%',
                                     color: 'red',
                                     borderRadius: '50%',
                                     background: '#ccc',
                                     width: '30px',
                                     height: '30px',
                                     display: 'flex',
                                     justifyContent: 'center',
                                     alignItems: 'center',
                                     
                                 }}
                                     >
                                         <i className="fas fa-trash"></i></span>
                      
                     </div>
                     </div>
                            </>
                           
                            }
                          
                           
                        </div>
                       
                    </div>
                    {this.state.isOpenImage === true && <Lightbox
                        mainSrc={this.state.privewImageUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        
                       
                    />}
                    
                </ModalBody>
                <ModalFooter>
                <Button color="success" className='px-2' onClick={()=>this.handleAddNewMembers()}>
                    Add new Members
                </Button>{' '}
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
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
       
        createNewMember: (data)=> dispatch(actions.createNewMember(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalMembers);




