import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {getAllNews,addNewsService} from "../../../services/newService"
import { toast } from 'react-toastify';
class ModalNews extends Component {

    constructor(props) {
        super(props);
        this.state = {
           tieuDe: "",
           anhTieuDe: "",
           isOpenImage: false,
           mota: "",
           tomTatTinTuc:""
        }
        
       

    }
    componentDidMount() {
        
    }
    getNews =()=>{
        this.props.loadNews()
    }
    toggle = () => {
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
        let arrInput = ['tieuDe',"anhTieuDe","mota","tomTatTinTuc"]
        for (let i = 0; i < arrInput.length;i++){
            if(!this.state[arrInput[i]]){
                isValid  = false;
                alert(arrInput[i]+ ' không được bỏ trống')
                break;
            }
           
        }
        return isValid
    }
    handleAddNews = async() => {
        let isValid = this.checkValidateInput()
        if(isValid === true) {
            // gọi API create model
           let data =  await addNewsService({
                tieuDe: this.state.tieuDe,
                anhTinTuc: this.state.anhTieuDe,
                tomTatTinTuc: this.state.tomTatTinTuc,
                mota: this.state.mota,
            })
            if(data.errCode ===0 ){

                this.toggle()
                this.getNews()
                toast.success("Đã thêm tin tức")
            }
         
        }

        
    }
    handleImage2 =async (even)=>{
        const COUND_NAME = 'djh5ubzth'
        const PRESET_NAME = 'b6oxas4h'
        const FOLDER_NAME = 'UploadNews'
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
                    if(res.data.secure_url){
                        this.setState({
                            anhTieuDe: res.data.secure_url
                           })
                    }
                    
                    // url= res.secure_url
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
                anhTieuDe: ""
           })
           
           
        }
    }
    render() {
        
        let url = this.state.anhTieuDe
        return (
            
        <Modal 
         isOpen={this.props.isOpen}
         toggle={()=>this.toggle()}
         className={"modalConttailer"}
         size= 'lg'
         centered 
         >
            <ModalHeader toggle={()=>this.toggle()}>Create New Category</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className=''>
                            <div className='col-12 form-group mg-top'>
                                <label>Tiêu đề bài viết</label>
                                <input type="text" className="form-control" placeholder='Nhập tên loại sản phẩm' onChange={(event)=>this.handleOnChageInput(event,'tieuDe')} name="tieuDe" value={this.state.tieuDe}/>
                            </div>
                            <div className=' col-sm-4 col-md-3 row'>
                                <div className=' form-group mg-top'>
                                    <label>Ảnh</label>
                                    <div className='upload-image'>
                                        
                                        <label htmlFor='taianh' className='text_image'>Tải ảnh <i class="fas fa-upload"></i></label>
                                      <input id='taianh' hidden type="file" onChange={(e)=>this.handleImage2(e,"image")}    />
                                       
                                       
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
                        <div className='col-12 form-group mg-top'>
                                <label >Tóm tắt tin tức</label>
                                <textarea className="form-control" onChange={(event)=>this.handleOnChageInput(event,'tomTatTinTuc')} value={this.state.tomTatTinTuc}>

                                </textarea>
                               
                              
                            </div> 
                        <div className='col-12 form-group mg-top'>
                                <label >Mô tả</label>
                                <CKEditor
                                editor = {ClassicEditor}
                                data={this.state.mota}
                                        
                                onChange={( event, editor ) => {
                                    const data = editor.getData();
                                    this.setState({
                                        mota: data
                                    })
                                }}
                />
                              
                            </div> 
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                <Button color="success" className='px-2' onClick={()=>this.handleAddNews()}>
                    Add New Category
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalNews);




