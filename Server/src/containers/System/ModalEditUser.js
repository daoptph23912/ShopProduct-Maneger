import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {emitter} from '../../utils/emitter';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            id: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            address: "",
            roleID: "",
        }
        

    }
   
    componentDidMount() {
        let user = this.props.currentUser
        if(user && !_.isEmpty(user)){
            this.setState ( {
                email: user.email,
                id: user.id,
                firstName: user.firstName,  
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                address: user.address,
                roleID: user.roleID,
            })
        }
        console.log('adada',user)
       
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
        let arrInput = ['email', 'firstName', 'lastName','phoneNumber','address','roleID']
        for (let i = 0; i < arrInput.length;i++){
            if(!this.state[arrInput[i]]){
                isValid  = false;
                alert(arrInput[i]+ ' không được bỏ trống')
                break;
            }
           
        }
        return isValid
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if(isValid === true) {
            // gọi API create model
            this.props.EditUser(this.state)
            
        }
        
    }
    render() {
        let roleId = this.props.userInfo.roleID
        return (
            
        <Modal 
         isOpen={this.props.isOpen}
         toggle={()=>this.toggle()}
         className={"modalConttailer"}
         size= 'lg'
         centered 
         >
            <ModalHeader toggle={()=>this.toggle()}>Edit User</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className=''>
                            <div className='col-12 form-group mg-top'>
                                <label>Email</label>
                                <input type="email" className="form-control" placeholder='Nhập Email' onChange={(event)=>this.handleOnChageInput(event,'email')} name="email" value={this.state.email} disabled/>
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
                            {roleId===1&&
                            <div className='col-6 form-group mg-top'>
                            <label for="inputState">Role ID</label>
                            {this.state.roleID =="" &&
                                    <select name="roleID" class="form-control" onChange={(event)=>this.handleOnChageInput(event,'roleID')} value={this.state.roleID}>
                                    <option selected value="">----</option>
                                    <option  value="1">Admin</option>
                                    <option  value="2">Editter</option>
                                    <option  value="3">Writer</option>
                                    </select>
                                }   
                                {this.state.roleID ==1 &&
                                    <select name="roleID" class="form-control" onChange={(event)=>this.handleOnChageInput(event,'roleID')} value={this.state.roleID}>
                                    <option selected value="1">Admin</option>
                                    <option  value="2">Editter</option>
                                    <option  value="3">Writer</option>
                                    </select>
                                }   
                                {this.state.roleID ==2 &&
                                     <select name="roleID" class="form-control" onChange={(event)=>this.handleOnChageInput(event,'roleID')} value={this.state.roleID}>
                                
                                     <option  value="1">Admin</option>
                                     <option selected value="2">Editter</option>
                                     <option  value="3">Writer</option>
                                     </select>
                                }
                                {this.state.roleID ==3 &&
                                     <select name="roleID" class="form-control" onChange={(event)=>this.handleOnChageInput(event,'roleID')} value={this.state.roleID}>
                                
                                     <option  value="1">Admin</option>
                                     <option  value="2">Editter</option>
                                     <option selected value="3">Writer</option>
                                     </select>
                                }
                               
                            
                                
                            </div>
                            }
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    {roleId===1&&
                          <Button color="success" className='px-2' onClick={()=>this.handleSaveUser()}>
                          Save
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
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);




