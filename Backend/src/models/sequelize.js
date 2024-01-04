const { Sequelize } = require('sequelize');

<<<<<<< HEAD
const sequelize = new Sequelize('fall2324w3g5', 'root', 'Chouchou.44', {
=======
const sequelize = new Sequelize('fall2324w3g5', 'root', '', {
>>>>>>> 2c5d8085d592b0e65f66d75ff32f17178c7bb115
  host: "localhost", // process.env.MYSQL_SERVICE_HOST
  dialect: 'mysql',
  port: 3306,
});

sequelize.authenticate().then(() => {
  console.log('Kết nối cơ sở dữ liệu thành công. ');
}).catch((error) => {
  console.error('Lỗi kết nối cơ sở dữ liệu:', error);
});

module.exports = sequelize; 