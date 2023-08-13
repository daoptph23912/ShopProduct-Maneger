import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {emitter} from '../../utils/emitter';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
class ModalEditCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
           name: "",
           id: "",
        }
        

    }
    
   
    componentDidMount() {
        let category = this.props.currentCategory
        if(category && !_.isEmpty(category)){
            this.setState ( {
                name: category.name,
                id: category.id
                
            })
        }
        console.log('adada',category)
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
        let arrInput = ['name']
        for (let i = 0; i < arrInput.length;i++){
            if(!this.state[arrInput[i]]){
                isValid  = false;
                alert(arrInput[i]+ ' không được bỏ trống')
                break;
            }
           
        }
        return isValid
    }
    handleAddNewCategory = () => {
        let isValid = this.checkValidateInput()
        if(isValid === true) {
            // gọi API create model
            this.props.EditCategory(this.state)
          
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
            <ModalHeader toggle={()=>this.toggle()}>Create New Category</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className=''>
                            <div className='col-12 form-group mg-top'>
                                <label>Tên loại sản phẩm</label>
                                <input type="text" className="form-control" placeholder='Nhập tên loại sản phẩm' onChange={(event)=>this.handleOnChageInput(event,'name')} name="name" value={this.state.name}/>
                            </div>
                           
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                <Button color="success" className='px-2' onClick={()=>this.handleAddNewCategory()}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditCategory);




