const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("shopmobie", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});
module.exports = sequelize;
