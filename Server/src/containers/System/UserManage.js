import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './UserManage.scss';
import { connect } from 'react-redux';
import { getAllUsers, CreateNewUserService,getRoles, DeleteUserService,EditUserService } from '../../services/userServices';
import { map } from 'lodash';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import {emitter} from '../../utils/emitter'
class UserManage extends Component {

   constructor(props){
    super(props);
    this.state = {
        arrUsers: [],
        isOpenModal: false,
        isOpenEditUserModal: false,
        userEdit: {},
        arrRoleID: []
    }
   }

    async componentDidMount() {
       await this.getAllUsersfromReact(); 
       await this.getRolesId();
       
    }
     handleAddNewUser = ()=>{
        this.setState({
            isOpenModal: true
        })
    }
    getRolesId = async()=>{
        let response = await getRoles();
        this.setState({
            arrRoleID: response.data
       })
    }
    toggleUserModal = ()=>{
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }
    toggleEditUserModal = ()=>{
        this.setState({
            isOpenEditUserModal: !this.state.isOpenEditUserModal
        })
    }
    getAllUsersfromReact = async()=>{
        let response = await getAllUsers('All');
      
        if(response && response.errCode === 0) {
         this.setState({
             arrUsers: response.users
         }) 
        
        }
    }
    createNewUser = async(data)=>{
        try {
            console.log(data);
           let response = await CreateNewUserService(data)
           if(response.errCode !== 0 && response){
            alert(response.errMessage)
           }else{
            await this.getAllUsersfromReact()
            this.setState({
                isOpenModal: false
            })
            emitter.emit("EVENT_CLERA_MODAL_DATA")
           }
        } catch (error) {
            console.log(error)
        }
       
        
    }
    handleDeleteUser = async(id)=>{
        try {
            let response = await DeleteUserService(id);
            if(response.errCode !== 0 && response){
                alert(response.errMessage)
            }else{
                await this.getAllUsersfromReact()
            }
        } catch (error) {
            console.log(error)
        }
        

    }
    handleEditUser = (user)=>{
        this.setState({
            isOpenEditUserModal: true,
            userEdit: user
        })
        
    }
    doEditUser = async(user)=>{
        try {
            await EditUserService(user);
            let response = await EditUserService(user);
            if(response.errCode === 0 && response){
                this.setState({
                    isOpenEditUserModal: false,
                })
                await this.getAllUsersfromReact()
            }else{
                alert(response.errMessage)
            }
        } catch (error) {
            console.log(error)
        }
    }
    render() {
       console.log(this.props.userInfo)
       let roleId = this.props.userInfo.roleID
       console.log(roleId,"s'alsfads")
       let arrUsers  = this.state.arrUsers
     
        return (
            <div className="container user-container">
                <ModalUser
                    isOpen = {this.state.isOpenModal}
                    test = {'abc'}
                    toggleFromParent = {this.toggleUserModal}
                    createNewUser = {this.createNewUser}
                />
                {this.state.isOpenEditUserModal &&
                    <ModalEditUser
                    isOpen = {this.state.isOpenEditUserModal}
                    toggleFromParent = {this.toggleEditUserModal}
                    currentUser = {this.state.userEdit}
                     EditUser = {this.doEditUser}
                />
                    
                }
                 
                <div className='title text-center'> Read Users</div>
                <div className='mx-2'>
                {
                    roleId===1&&
                    <button className='btn btn-primary px-2' onClick={()=>this.handleAddNewUser()}> <i className='fas fa-plus px-2'></i>Add new user</button>
                }
                </div>
                <div className='user-table mt-4 mx-2'>
                <table id="customers" class="ws-table-all">
                    <tbody>
                        <tr>
                        <th>Email</th>
                        <th>Fist Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Role ID</th>
                        <th>Action</th>
                       
                        </tr>
                        
                    
                    {arrUsers && arrUsers.map((item,index) =>{
                        return(
                            <>
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        {
                                            item.roleID == 1 && "Admin"
                                        } 
                                        {
                                            item.roleID == 2 && "Editter"
                                        }
                                        {
                                            item.roleID == 3 && "Writer"
                                        }
                                    </td>
                                    <td className='action'>
                                        
                                    <button onClick={()=>this.handleEditUser(item)} class="btn btn-success mx-1 px-2 ">Edit</button>
                                    {
                                    roleId===1&&
                                    <button  onClick={()=>this.handleDeleteUser(item.id)} class="btn btn-danger  px-2">Delete</button>
                                    }
                                    </td>
                                </tr>
                            </>
                        )
                         
                    })}    
                    </tbody></table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    console.log(state.user.userInfo,"ld;adsf")
    return {
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
