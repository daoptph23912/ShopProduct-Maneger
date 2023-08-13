// import db from "../models/index";
const productSercive = require("../services/productService");
// import multer from "multer";
// import path from "path";
const uploadCloud = require("../config/upLoadfile");
let handleGetAllProducts = async (req, res) => {
  try {
    let page = req.query.page;
    let data = await productSercive.handleGetAllProductsService(page);
    return res.status(200).json(data);
  } catch (error) {
    console.log("Lỗi phân quyền", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Không kết nối được với sever",
    });
  }
};
let handleGetAllTotalProducts = async (req, res) => {
  try {
    let data = await productSercive.handleGetAllTotalProductsService();
    return res.status(200).json(data);
  } catch (error) {
    console.log("Lỗi phân quyền", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Không kết nối được với sever",
    });
  }
};
let handleAddProducts = async (req, res) => {
  try {
    let message = await productSercive.AddProductsService(req.body);
    console.log(message);
    return res.status(200).json(message);
  } catch (error) {
    console.log("Lỗi phân quyền", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Không kết nối được với sever",
    });
  }
};
let handleDeleteProduct = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Danh sách sản phẩm không tồn tại",
    });
  } else {
    let message = await productSercive.deleteProduct(req.body.id);
    console.log(message);
    return res.status(200).json(message);
  }
};
let handleEditProduct = async (req, res) => {
  let data = req.body;
  // console.log(data)
  let message = await productSercive.editProductsService(data);
  //console.log(message)
  return res.status(200).json(message);
};
let handleGetProduct = async (req, res) => {
  try {
    let page = req.body.page;
    let data = await productSercive.handleGetProductsService(page);
    return res.status(200).json(data);
  } catch (error) {
    console.log("Lỗi phân quyền", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Không kết nối được với sever",
    });
  }
};
let handleUploadFileProduct = async (req, res) => {
  try {
    console.log(req.body);
    const id = req.body.id;
    console.log(id);
    await uploadCloud.uploader.destroy(id);
    //  const file = req.body
    //  console.log(file)
    return res.status(200).json(req.body);
  } catch (error) {
    console.log("Lỗi phân quyền", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Không kết nối được với sever",
    });
  }
};
let handleDeleteFileProduct = async (req, res) => {
  try {
    console.log(req.body);
    //  const file = req.body
    //  console.log(file)
    return res.status(200).json(req.body);
  } catch (error) {
    console.log("Lỗi phân quyền", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Không kết nối được với sever",
    });
  }
};
let handleGetAllProductsCategories = async (req, res) => {
  try {
    let id = req.query.id;

    let data = await productSercive.handleGetAllProductsCategoriesService(id);
    return res.status(200).json(data);
  } catch (error) {
    console.log("Lỗi phân quyền", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Không kết nối được với sever",
    });
  }
};
let handleGetOneProducts = async (req, res) => {
  try {
    let id = req.query.id;

    let data = await productSercive.handleGetOneProductService(id);
    return res.status(200).json(data);
  } catch (error) {
    console.log("Lỗi phân quyền", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Không kết nối được với sever",
    });
  }
};
let handleGetAllCategoryProduct = async (req, res) => {
  try {
    let id = req.query.id;
    console.log(id);
    let data = await productSercive.handleGetAllCategoriesProductService(id);
    return res.status(200).json(data);
  } catch (error) {
    console.log("Lỗi phân quyền", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Không kết nối được với sever",
    });
  }
};

module.exports = {
  handleGetAllProducts: handleGetAllProducts,
  handleAddProducts: handleAddProducts,
  handleDeleteProduct: handleDeleteProduct,
  handleEditProduct: handleEditProduct,
  handleGetProduct: handleGetProduct,
  handleUploadFileProduct: handleUploadFileProduct,
  handleDeleteFileProduct: handleDeleteFileProduct,
  handleGetAllProductsCategories: handleGetAllProductsCategories,
  handleGetOneProducts: handleGetOneProducts,
  handleGetAllTotalProducts: handleGetAllTotalProducts,
  handleGetAllCategoryProduct: handleGetAllCategoryProduct,
};
