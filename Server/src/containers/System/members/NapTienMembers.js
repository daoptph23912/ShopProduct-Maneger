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
import  './product.scss';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios  from "../../../axios";
import _ from 'lodash';
import Moment from 'moment';
import vi from "moment/locale/vi";
import fr from "moment/locale/fr";
class NapTienMembers extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            arrPrice: [],
            napTien: 0,
            anhChuyenTien: '',
            idPrice: 0

        }
       

    }
 
    
    async componentDidMount () {
        
        this.setState({
            anhChuyenTien: this.props.currentMembersNapTien,
            idPrice: this.props.currentNapTien,
            napTien: this.props.tienNap
        })
        
        
           
     
    }
    
    toggle = () => {
       
        this.props.toggleFromParentNapTien()
    }
    handleOnChageInput = (event, id)=>{
        let copyState = {...this.state}
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }
    handleEditPriceMembers =()=>{

         if(this.state.napTien&&this.props.currentMembersNapTien){
            this.props.updateMembersPrice({
                id:this.state.idPrice,
                tienNap: this.state.napTien,
                idUser: this.props.currentMembersNapTien
            })
            this.toggle()
            
        }
    }
    price =(price)=>{
       
            let x = price;
            x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
            return  x;
        
       
    } 
    render() { 
        
        
       
       
        let arrPrice = this.state.arrPrice 
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
                <div className='container'></div>
                <div className=''>
                            <div className='col-12 row mg-top'>
                               
                                <div className='col-12 form-group alignItems-center justifyContent-center'style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <div className='col-9'>
                                    <div >
                                        <p style={{fontSize:"17px", fontWeight:"700"}}>
                                            Số tiền nạp: <span style={{color:"red"}}>{this.price(parseInt(this.state.napTien))}</span>
                                        </p>
                                    </div>
                                    <label>Nhập số tiền cần nạp</label>
                                    <input type='number' onChange={(event)=>this.handleOnChageInput(event,'napTien')} className='form-control' value={this.state.napTien}/>
                                    </div>
                                   
                                </div>
                               
                            </div> 
                            </div>
               
                    
                </ModalBody>
                <ModalFooter>
                <Button color="success" className='px-2' onClick={()=>this.handleEditPriceMembers()}>
                        Nạp tiền
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
        arrPrice: state.admin.priceMembers,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
        fetchMembersPrice: (id)=> dispatch(actions.fetchMembersPrice(id)),
        updateMembersPrice: (data)=> dispatch(actions.updateMembersPrice(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NapTienMembers);




