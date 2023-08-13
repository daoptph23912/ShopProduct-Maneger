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
import Moment from "moment";
import NapTienMembers from "./NapTienMembers";
// import vi from "moment/locale/vi";
import fr from "moment/locale/fr";
import ModalImagePrice from "./ModalImagePrice";
class ModalDanhSachNap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      arrPrice: [],
      napTien: 0,
      idMember: null,
      isOpenAnhNapTien: false,
      isOpenNapTien: false,
      idPrice: null,
      imagePrice: "",
      tienNap: "",
    };
  }

  async componentDidMount() {
    let id = await this.props.currentMembersNapTien;
    console.log(id, "members");

    if (id) {
      this.props.fetchMembersPrice(id);
      this.setState({
        idMember: id,
      });
    }
  }

  toggle = () => {
    this.props.toggleFromParentNapTien();
  };
  handleOnChageInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.arrPrice !== this.props.arrPrice) {
      this.setState({
        arrPrice: this.props.arrPrice,
      });
    }
  }
  price = (price) => {
    let x = price;
    x = x.toLocaleString("it-IT", { style: "currency", currency: "VND" });
    return x;
  };
  formatDate = (date) => {
    const newFr = Moment(date).locale("vi", fr).format("DD/MM/YYYY");
    return newFr;
  };
  formatTime = (time) => {
    const newFr = Moment(time).locale("vi", fr).format("HH:mm:ss");
    return newFr;
  };
  handleNapTien = (id, tienNap) => {
    this.setState({
      isOpenNapTien: !this.state.isOpenNapTien,
      idPrice: id,
      tienNap: tienNap,
    });
    // if(this.state.napTien&&this.props.currentMembersNapTien){
    //     this.props.updateMembersPrice({
    //         id:id,
    //         tienNap: this.state.napTien,
    //         idUser: this.props.currentMembersNapTien
    //     })
    // }
  };
  addidMembers = (id) => {
    return id;
  };
  handleImagePrice = (image) => {
    this.setState({
      imagePrice: image,
      isOpenAnhNapTien: !this.state.isOpenAnhNapTien,
    });
  };
  handleDeleteMembers = (id) => {
    if (id) {
      this.props.updateHuyMembersPrice({
        id: id,
        idUser: this.props.currentMembersNapTien,
      });
      this.props.toggleFromParentNapTien();
    }
  };
  toggleMembersNapTienModal = () => {
    this.setState({
      isOpenNapTien: !this.state.isOpenNapTien,
    });
  };
  toggleMembersAnhNapTienModal = () => {
    this.setState({
      isOpenAnhNapTien: !this.state.isOpenAnhNapTien,
    });
  };

  render() {
    console.log(this.state.isOpenAnhNapTien);
    let arrPrice = this.state.arrPrice;
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modalConttailer"}
        size="lg"
        centered
      >
        {this.state.isOpenNapTien && (
          <NapTienMembers
            isOpen={this.state.isOpenNapTien}
            toggleFromParentNapTien={this.toggleMembersNapTienModal}
            currentMembersNapTien={this.state.idMember}
            currentNapTien={this.state.idPrice}
            tienNap={this.state.tienNap}
          />
        )}
        {this.state.isOpenAnhNapTien && (
          <ModalImagePrice
            isOpen={this.state.isOpenAnhNapTien}
            toggleFromParentNapTien={this.toggleMembersAnhNapTienModal}
            currentMembersNapTien={this.state.imagePrice}
          />
        )}

        <ModalHeader toggle={() => this.toggle()}>
          Danh Sách Nạp tiền
        </ModalHeader>
        <ModalBody style={{ maxHeight: "700px", overflow: "auto" }}>
          <div className="members-table mt-4 mx-2">
            <table id="customers" class="ws-table-all px-5">
              <tbody>
                <tr>
                  <th>Ảnh</th>
                  <th>Số tiền nạp</th>
                  <th>Ngày nạp</th>
                  <th>Trạng thái</th>
                  <th>Chỉnh Sửa</th>
                </tr>
                {arrPrice &&
                  arrPrice.map((item, index) => {
                    return (
                      <>
                        <tr>
                          <td
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <img
                              onClick={() => this.handleImagePrice(item.anhCK)}
                              style={{ maxWidth: "150px", maxHeight: "150px" }}
                              src={item.anhCK}
                            />
                          </td>

                          <td
                            style={{
                              color: item.status === 1 ? "#228B22" : "#B22222",
                              fontWeight: "600",
                              textAlign: "center",
                            }}
                          >
                            {item.status === 1
                              ? "+" + this.price(item.tienNap)
                              : this.price(item.tienNap)}
                          </td>
                          <td
                            style={{
                              fontSize: "15px",
                              lineHeight: "20px",
                              fontWeight: "600",
                              textAlign: "center",
                            }}
                          >
                            <p>{this.formatDate(item.createdAt)}</p>
                            <p>{this.formatTime(item.createdAt)}</p>
                          </td>
                          <td>
                            {item.status === 0 && (
                              <p
                                style={{
                                  textAlign: "center",
                                  color: "#FFA500",
                                  fontSize: "15px",
                                  fontWeight: "600",
                                }}
                              >
                                {" "}
                                Chờ xét duyệt{" "}
                              </p>
                            )}
                            {item.status === 1 && (
                              <p
                                style={{
                                  textAlign: "center",
                                  color: "#008000",
                                  fontSize: "15px",
                                  fontWeight: "600",
                                }}
                              >
                                Nạp tiền thành công{" "}
                              </p>
                            )}
                            {item.status === 2 && (
                              <p
                                style={{
                                  textAlign: "center",
                                  color: "#8B0000",
                                  fontSize: "15px",
                                  fontWeight: "600",
                                }}
                              >
                                Nạp tiền thất bại{" "}
                              </p>
                            )}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.status === 1 && (
                              <button
                                onClick={() => this.handleNapTien()}
                                disabled
                                class="btn btn-success mx-1 px-2 "
                              >
                                Nạp
                              </button>
                            )}
                            {item.status === 0 && (
                              <>
                                <button
                                  onClick={() =>
                                    this.handleNapTien(item.id, item.tienNap)
                                  }
                                  class="btn btn-success mx-1 px-2 "
                                >
                                  Nạp
                                </button>
                                <button
                                  onClick={() =>
                                    this.handleDeleteMembers(item.id)
                                  }
                                  class="btn btn-danger  px-2"
                                >
                                  Hủy nạp
                                </button>
                              </>
                            )}
                            {item.status === 2 && (
                              <>
                                <button
                                  onClick={() => this.handleNapTien()}
                                  disabled
                                  class="btn btn-success mx-1 px-2 "
                                >
                                  Nạp
                                </button>
                                <button
                                  onClick={() => this.handleDeleteMembers()}
                                  disabled
                                  class="btn btn-danger  px-2"
                                >
                                  Hủy nạp
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
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
    updateHuyMembersPrice: (data) =>
      dispatch(actions.updateHuyMembersPrice(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDanhSachNap);
