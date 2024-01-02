const { Sequelize } = require('sequelize');

<<<<<<< HEAD
const sequelize = new Sequelize('fall2324w3g5', 'root', 'Chouchou.44', {
  host: 'localhost',
=======
const sequelize = new Sequelize('fall2324w3g5', 'root', '', {
  host: "localhost", // process.env.MYSQL_SERVICE_HOST
>>>>>>> aff3f4a1424698e4a2cf11a625147de1688226d9
  dialect: 'mysql',
  port: 3306,
});

sequelize.authenticate().then(() => {
  console.log('Kết nối cơ sở dữ liệu thành công. ');
}).catch((error) => {
  console.error('Lỗi kết nối cơ sở dữ liệu:', error);
});

module.exports = sequelize; 