'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Products.init({
    tenSp: DataTypes.STRING,
    hangSx: DataTypes.STRING,
    giaSanPham: DataTypes.STRING,
    idDanhSach: DataTypes.INTEGER,
    soLuong: DataTypes.INTEGER,
    giaNhap: DataTypes.INTEGER,
    hot: DataTypes.INTEGER,
    sale: DataTypes.INTEGER,
    image: DataTypes.STRING,
    mota: DataTypes.STRING,
    luotXem: DataTypes.INTEGER,
    luotTim: DataTypes.INTEGER,
    luotMua: DataTypes.INTEGER,
    
    
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};