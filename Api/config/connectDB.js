const { Sequelize } = require("sequelize");
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("shopmobie", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});
let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Đã kết nối thành công Database shop");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = connectDB;
