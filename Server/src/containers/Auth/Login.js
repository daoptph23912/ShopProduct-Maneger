import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
// import { FormattedMessage } from 'react-intl';
import {handleLoginApi} from '../../services/userServices';
// import {userLoginSuccess} from '../../store/actions/userActions';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernames: "",
            password: "",
            isShowpassword: false,
            errMessage: ''
        };
    }
     data = [
           {
            id:1,
            usernames: 'Admin',
            password: '123'
           }


    ];
   
     handleChageUsername =(event) => {
        this.setState({
            usernames: event.target.value
        })
        
    }
    handleChagePassword =(event) => {
        this.setState({
            password: event.target.value
        })
      
    }
    
    handleLogin =async() => {
        this.setState({
            errMessage: '',

        });
        try {
           let data = await handleLoginApi(this.state.usernames, this.state.password)
           if (data && data.errCode !==0){
            this.setState({
                errMessage: data.message,
    
            });
           }
           if (data && data.errCode == 0){
               await this.props.userLoginSuccess(data.user)
                console.log("Đăng nhập thành công")
           }
           console.log(data);
        } catch (e) {
            if(e.response){
                if(e.response.data){
                    
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }
            
        }
       
        
    }
    showPassword=()=>{
        this.setState({
            isShowpassword: !this.state.isShowpassword
        })
    }
    render() {
        

        return (
           <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                            <div className='col-12 text-center topLoggin'>
                                Login
                            </div>
                            <div className='col-12 form-group login_input'>
                                <label>Username</label>
                                   <input type="email" className="form-control" placeholder="Username" name="username" value={this.state.usernames} onChange={(e)=>this.handleChageUsername(e)} /> 
                            </div>
                            <div className='col-12 form-group login_input'>
                                <label>Passwword</label>
                                <div className='wrap_input'>
                                    <input type={this.state.isShowpassword?'text':'password'} className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={(e)=>this.handleChagePassword(e)}/> 
                                    <span className='eye' onClick={()=>this.showPassword()}><i class={this.state.isShowpassword?"fas fa-eye":'fas fa-eye-slash'}></i></span>
                                </div>
                                 
                            </div>
                            <div className="col-12" style={{color:'red'}}>
                                {this.state.errMessage}
                            </div>
                            <div className='col-12 btn_login'>
                            <button className="button_submit" onClick={()=>this.handleLogin()}>Login</button>
                            </div>
                            
                            <div className='col-12'>
                                <span>Forgot your Password?</span>
                            </div>
                            
                            <div className='col-12'>
                                <div className='text-center '>Or login with</div>
                                
                                 <div className='with_login'>
                                    <span class="fab fa-facebook-f"></span>
                                   
                                    <span class="fab fa-twitter"></span>
                                    <span class="fab fa-google-plus-g"></span>

                                 </div>

                            </div>
                    </div>
                </div>
           </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo)=> dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
