import React, { Component } from "react";
// import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
// import {emitter} from '../../../utils/emitter';
// import {CommonUtils} from '../../../utils';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { getAllMembers } from '../../../services/membersService';
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "./product.scss";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import _ from "lodash";
import axios from "../../../axios";
class ModalEditMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      tenThanhVien: "",
      email: "",
      soDienThoai: "",
      gioiTinh: "",
      anhDaiDien: "",
      matKhau: "",
      diaChi: "",
      status: "",
      tienTk: 0,
    };
  }

  getAllCategoryfromReact = async () => {
    // let response = await getAllMembers();
    //  this.setState({
    //     arrCategories: response.categories
    //  })
  };
  async componentDidMount() {
    const arr = [];
    let members = this.props.currentMembers;
    console.log(members);
    if (members && !_.isEmpty(members)) {
      this.setState({
        tenThanhVien: members.tenThanhVien,
        email: members.email,
        soDienThoai: members.soDienThoai,
        gioiTinh: members.gioiTinh,
        anhDaiDien: members.anhDaiDien,
        matKhau: members.matKhau,
        status: members.status,
        tienTk: members.tienTk,
        diaChi: members.diaChi,
        id: members.id,
      });
    }
  }
  toggle = () => {
    this.props.toggleFromParent();
  };
  handleOnChageInput = (event, id) => {
    // console.log(event.target.value,id)
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "tenThanhVien",
      "email",
      "soDienThoai",
      "gioiTinh",
      "diaChi",
      "anhDaiDien",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert(arrInput[i] + " không được bỏ trống");
        break;
      }
    }
    return isValid;
  };
  handleEditMembers = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.props.editMember({
        anhDaiDien: this.state.anhDaiDien,
        tenThanhVien: this.state.tenThanhVien,
        email: this.state.email,
        gioiTinh: this.state.gioiTinh,
        soDienThoai: this.state.soDienThoai,
        status: this.state.status,
        diaChi: this.state.diaChi,
        tienTk: this.state.tienTk,
        id: this.state.id,
      });
      this.setState({
        tenThanhVien: "",
        email: "",
        soDienThoai: "",
        gioiTinh: "",
        anhDaiDien: "",
        matKhau: "",
        diaChi: "",
        status: "",
      });

      this.props.toggleFromParent();
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    // if(prevProps.categoriesRedux !== this.props.categoriesRedux){
    //     this.setState({
    //         arrCategories2: this.props.categoriesRedux
    //     })
    // }
  }

  handleImage2 = async (even) => {
    const COUND_NAME = "djh5ubzth";
    const PRESET_NAME = "b6oxas4h";
    const FOLDER_NAME = "UploadFileMember";
    const url = "";
    const data = even.target.files[0];
    const api = `https://api.cloudinary.com/v1_1/${COUND_NAME}/image/upload`;
    const fromData = new FormData();

    const checkfile = 0;

    if (data) {
      fromData.append("upload_preset", PRESET_NAME);
      fromData.append("folder", FOLDER_NAME);
      fromData.append("file", data);
      await axios
        .post(api, fromData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.setState({
            anhDaiDien: res.secure_url,
          });
        });
    }
  };

  openImage = () => {
    if (this.state.privewImageUrl) {
      this.setState({
        isOpenImage: true,
      });
    }
  };
  DeleteImage = (image) => {
    if (image) {
      this.setState({
        anhDaiDien: "",
      });
    }
  };
  render() {
    let url = this.state.anhDaiDien;

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
          <div className="container">
            <div></div>
            <div className="">
              <div className="col-12 row mg-top">
                <div className="col-6 form-group">
                  <label>Họ và tên</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên"
                    onChange={(event) =>
                      this.handleOnChageInput(event, "tenThanhVien")
                    }
                    name="tenThanhVien"
                    value={this.state.tenThanhVien}
                  />
                </div>
                <div className="col-6 form-group ">
                  <label>Email</label>
                  <input
                    disabled
                    type="text"
                    className="form-control"
                    placeholder="Nhập email"
                    onChange={(event) =>
                      this.handleOnChageInput(event, "email")
                    }
                    name="email"
                    value={this.state.email}
                  />
                </div>
              </div>

              <div className=" col-12 row">
                <div className="col-3 form-group  mg-top">
                  <label for="inputState">Giới tính</label>

                  {this.state.gioiTinh && this.state.gioiTinh === 1 ? (
                    <select
                      name="roleID"
                      class="form-select"
                      onChange={(event) =>
                        this.handleOnChageInput(event, "gioiTinh")
                      }
                      value={this.state.gioiTinh}
                    >
                      <option value="0">---- Chọn giới tính -----</option>
                      <option selected value="1">
                        Nam
                      </option>
                      <option value="2">Nữ</option>
                      <option value="3">Khác</option>
                    </select>
                  ) : (
                      <select
                        name="roleID"
                        class="form-select"
                        onChange={(event) =>
                          this.handleOnChageInput(event, "gioiTinh")
                        }
                        value={this.state.gioiTinh}
                      >
                        <option value="0">---- Chọn giới tính -----</option>
                        <option value="1">Nam</option>
                        <option selected value="2">
                          Nữ
                        </option>
                        <option value="3">Khác</option>
                      </select>
                    ) &&
                    this.state.gioiTinh &&
                    this.state.gioiTinh === 3 ? (
                    <select
                      name="roleID"
                      class="form-select"
                      onChange={(event) =>
                        this.handleOnChageInput(event, "gioiTinh")
                      }
                      value={this.state.gioiTinh}
                    >
                      <option value="0">---- Chọn giới tính -----</option>
                      <option value="1">Nam</option>
                      <option value="2">Nữ</option>
                      <option selected value="3">
                        Khác
                      </option>
                    </select>
                  ) : (
                    <select
                      name="roleID"
                      class="form-select"
                      onChange={(event) =>
                        this.handleOnChageInput(event, "gioiTinh")
                      }
                      value={this.state.gioiTinh}
                    >
                      <option selected value="0">
                        ---- Chọn giới tính -----
                      </option>
                      <option value="1">Nam</option>
                      <option value="2">Nữ</option>
                      <option value="3">Khác</option>
                    </select>
                  )}
                </div>
                <div className="col-3 form-group mg-top">
                  <label>Số điện thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập số điện thoại"
                    onChange={(event) =>
                      this.handleOnChageInput(event, "soDienThoai")
                    }
                    name="soDienThoai"
                    value={this.state.soDienThoai}
                  />
                </div>
                <div className="col-6 form-group mg-top">
                  <label>Địa chỉ</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập địa chỉ"
                    onChange={(event) =>
                      this.handleOnChageInput(event, "diaChi")
                    }
                    name="name"
                    value={this.state.diaChi}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="col-6"></div>
              </div>
              <div className="col-6 form-group ">
                <label>Tiền tài khoản</label>
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  placeholder="Nhập tiền Tài khoản"
                  onChange={(event) => this.handleOnChageInput(event, "tienTk")}
                  name="tienTk"
                  value={this.state.tienTk}
                />
              </div>
              <div className=" col-12 row">
                <div className="col-3 form-group mg-top">
                  <label>Ảnh đại diện</label>
                  <div className="upload-image">
                    <label htmlFor="taianh" className="text_image">
                      Tải ảnh <i class="fas fa-upload"></i>
                    </label>
                    <input
                      id="taianh"
                      hidden
                      type="file"
                      onChange={(e) => this.handleImage2(e, "image")}
                      multiple
                    />
                  </div>
                </div>
              </div>

              {url && (
                <>
                  <div className="flex  col-12 flexNewEdit ">
                    <div
                      className="col-md-4 col-sm-12 "
                      style={{ position: "relative", marginTop: "10px" }}
                    >
                      <img
                        style={{ maxWidth: "230px" }}
                        onClick={() => this.openImage()}
                        src={url}
                      />
                      <span
                        onClick={() => this.DeleteImage(url)}
                        className="p-2 cursor-pointer hover:bg-gray-400"
                        style={{
                          position: "absolute",
                          cursor: "pointer",
                          right: "0%",
                          top: "-7%",
                          color: "red",
                          borderRadius: "50%",
                          background: "#ccc",
                          width: "30px",
                          height: "30px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </span>
                    </div>
                  </div>
                </>
              )}

              <div className="col-3 form-group  mg-top">
                <label for="inputState">Trạng thái người dùng</label>

                {this.state.status === 1 ? (
                  <select
                    name="roleID"
                    class="form-select"
                    onChange={(event) =>
                      this.handleOnChageInput(event, "status")
                    }
                    value={this.state.status}
                  >
                    <option value="0">Đang hoạt động</option>
                    <option selected value="1">
                      Đang chờ nạp tiền
                    </option>
                    <option value="2">Khóa Tài khoản</option>
                    <option value="3">Khóa nạp tiền</option>
                  </select>
                ) : (
                    <select
                      name="roleID"
                      class="form-select"
                      onChange={(event) =>
                        this.handleOnChageInput(event, "status")
                      }
                      value={this.state.status}
                    >
                      <option value="0">Đang hoạt động</option>
                      <option value="1">Đang chờ nạp tiền</option>
                      <option selected value="2">
                        Khóa Tài khoản
                      </option>
                      <option value="3">Khóa nạp tiền</option>
                    </select>
                  ) && this.state.status === 3 ? (
                  <select
                    name="roleID"
                    class="form-select"
                    onChange={(event) =>
                      this.handleOnChageInput(event, "status")
                    }
                    value={this.state.status}
                  >
                    <option value="0">Đang hoạt động</option>
                    <option value="1">Đang chờ nạp tiền</option>
                    <option value="2">Khóa Tài khoản</option>
                    <option selected value="3">
                      Khóa nạp tiền
                    </option>
                  </select>
                ) : (
                  <select
                    name="roleID"
                    class="form-select"
                    onChange={(event) =>
                      this.handleOnChageInput(event, "status")
                    }
                    value={this.state.status}
                  >
                    <option selected value="0">
                      Đang hoạt động
                    </option>
                    <option value="1">Đang chờ nạp tiền</option>
                    <option value="2">Khóa Tài khoản</option>
                    <option value="3">Khóa nạp tiền</option>
                  </select>
                )}
              </div>
            </div>
          </div>
          {this.state.isOpenImage === true && (
            <Lightbox
              mainSrc={this.state.privewImageUrl}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            className="px-2"
            onClick={() => this.handleEditMembers()}
          >
            Edit Members
          </Button>{" "}
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
    // categoriesRedux: state.admin.categories,
    // isLoading: state.admin.isLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getCategoriesStart: ()=> dispatch(actions.fetchCategoriesStart()),
    editMember: (data) => dispatch(actions.editMember(data)),
    // fetchMembers: ()=> dispatch(actions.fetchMembers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditMembers);
