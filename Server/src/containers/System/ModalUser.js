import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {emitter} from '../../utils/emitter';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            address: "",
            roleId: "",
        }
        this.listenToEmitter();

    }
    listenToEmitter(){
        emitter.on('EVENT_CLERA_MODAL_DATA', ()=>{
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                address: "",
                roleId: "",
            })
        })
    }
    componentDidMount() {
        
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
        const phoneNumber = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let arrInput = ['email', 'password', 'firstName', 'lastName','phoneNumber','address','roleId']
        for (let i = 0; i < arrInput.length;i++){
            if(!this.state[arrInput[i]]){
                isValid  = false;
                alert(arrInput[i]+ ' không được bỏ trống')
                break;
            }
           
        }
        if(regexEmail.test(this.state.email)=== true){
            console.log("OK")
            
        }else{
            alert('Email không đúng định dạng')
            return
        }
        if(phoneNumber.test(this.state.phoneNumber)=== true){
            console.log("OK")
            
        }else{
            alert('Số điện thoại không đúng định dạng')
            return
        }
        return isValid
    }
    handleAddNewUser = () => {
        let isValid = this.checkValidateInput()
        if(isValid === true) {
            // gọi API create model
            this.props.createNewUser(this.state)
            console.log(this.state)
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
            <ModalHeader toggle={()=>this.toggle()}>Create New User</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className=''>
                            <div className='col-12 form-group mg-top'>
                                <label>Email</label>
                                <input type="email" className="form-control" placeholder='Nhập Email' onChange={(event)=>this.handleOnChageInput(event,'email')} name="email" value={this.state.email} required/>
                            </div>
                            <div className='col-12 form-group mg-top' >
                                <label>Password</label>
                                <input type="" className="form-control" placeholder='Nhập mật khẩu' name="password" onChange={(event)=>this.handleOnChageInput(event,'password')} value={this.state.password}/>
                            </div>
                            <div className='col-12 row mg-top'>
                                <div className='col-6 form-group'>
                                    <label>First Name</label>
                                    <input type="text" className="form-control" placeholder='Tên đầu' name="firstName" onChange={(event)=>this.handleOnChageInput(event,'firstName')} value={this.state.firstName}/>
                                </div> 
                                <div className='col-6 form-group float-right'>
                                    <label>Last Name</label>
                                    <input type="text" className="form-control" placeholder='Tên cuối' name="lastName" onChange={(event)=>this.handleOnChageInput(event,'lastName')} value={this.state.lastName}/>
                                </div>
                            </div>
                            <div className='col-12 form-group mg-top row'>
                                <div className='col-6 form-group '>
                                    <label>Address</label>
                                    <input type="" className="form-control" placeholder='Địa chỉ' name="address" onChange={(event)=>this.handleOnChageInput(event,'address')} value={this.state.address}/>
                                </div>
                                <div className='col-6 form-group float-right'>
                                    <label>Phone Number</label>
                                    <input type="number" className="form-control" placeholder='Số điện thoại' name="phoneNumber" onChange={(event)=>this.handleOnChageInput(event,'phoneNumber')} value={this.state.phoneNumber}/>
                                </div>
                            </div>
                            <div className='col-6 form-group mg-top'>
                            <label for="inputState">Role ID</label>
                                <select name="roleID" class="form-control" onChange={(event)=>this.handleOnChageInput(event,'roleId')} value={this.state.roleId}>
                                <option selected value="">----</option>
                                <option  value="1">Admin</option>
                                <option value="2">Editter</option>
                                <option value="3">Writer</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                <Button color="success" className='px-2' onClick={()=>this.handleAddNewUser()}>
                    Add New User
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);




