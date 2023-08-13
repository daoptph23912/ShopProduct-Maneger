'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Members extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Members.init({
    email: DataTypes.STRING,
    tenThanhVien: DataTypes.STRING,
    gioiTinh: DataTypes.INTEGER,
    anhDaiDien: DataTypes.STRING,
    anhCK: DataTypes.STRING,
    soDienThoai: DataTypes.STRING,
    diaChi: DataTypes.STRING,
    matKhau: DataTypes.STRING,
    tienTk: DataTypes.INTEGER,
    tienNap: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
   
  }, {
    sequelize,
    modelName: 'Members',
  });
  return Members;
};