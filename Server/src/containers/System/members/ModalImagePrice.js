import React, { Component } from "react";
// import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
// import {emitter} from '../../../utils/emitter';
// import {CommonUtils} from '../../../utils';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { getAllMembers } from '../../../services/membersService';
import * as actions from "../../../store/actions";
// import Lightbox from 'react-image-lightbox';
import "react-image-lightbox/style.css";
import "./product.scss";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import axios  from "../../../axios";
import _ from "lodash";
// import Moment from 'moment';
// import vi from "moment/locale/vi";
// import fr from "moment/locale/fr";
class ModalImagePrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anhCHuyenTien: "",
    };
  }

  async componentDidMount() {
    this.setState({
      anhCHuyenTien: this.props.currentMembersNapTien,
    });
  }

  toggle = () => {
    this.props.toggleFromParentNapTien();
  };

  render() {
    let arrPrice = this.state.arrPrice;
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modalConttailer"}
        size="lg"
        centered
      >
        <ModalHeader toggle={() => this.toggle()}>Ảnh chuyển khoản</ModalHeader>
        <ModalBody>
          <div className="container"></div>
          <div className="">
            <div className="col-12 row mg-top">
              <div
                className="col-12 form-group alignItems-center justifyContent-center"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  style={{ maxWidth: "500px" }}
                  src={this.state.anhCHuyenTien}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" className="px-2" onClick={() => this.toggle()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    arrPrice: state.admin.priceMembers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMembersPrice: (id) => dispatch(actions.fetchMembersPrice(id)),
    updateMembersPrice: (data) => dispatch(actions.updateMembersPrice(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalImagePrice);
