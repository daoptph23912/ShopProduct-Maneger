import React, { Component } from "react";

import { connect } from "react-redux";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import * as actions from "../../../store/actions";
// import Lightbox from 'react-image-lightbox';
import "react-image-lightbox/style.css";

// import axios  from "../../../axios";

class ModalDeleteMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenImage: false,
      id: "",
    };
  }

  async componentDidMount() {}
  toggle = () => {
    this.setState({
      file: [],
    });
    this.props.toggleFromParent();
  };

  componentDidUpdate(prevProps, prevState, snapshot) {}
  handleDeleteMembers = async () => {
    if (this.props.currentMembersId) {
      await this.props.DeleteMember({ id: this.props.currentMembersId });
      this.props.toggleFromParent();
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modalConttailer"}
        size="lg"
        centered
      >
        <ModalHeader toggle={() => this.toggle()}>
          Create New Members
        </ModalHeader>
        <ModalBody>
          <h3>Bạn có chắc muốn xóa chứ</h3>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            className="px-2"
            onClick={() => this.handleDeleteMembers()}
          >
            Delete
          </Button>{" "}
          <Button color="light" className="px-2" onClick={() => this.toggle()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    DeleteMember: (data) => dispatch(actions.DeleteMember(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteMember);
