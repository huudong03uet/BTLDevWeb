const { Sequelize } = require('sequelize');

<<<<<<< HEAD
const sequelize = new Sequelize('fall2324w3g5', 'root', '12345678', {
=======
const sequelize = new Sequelize('fall2324w3g5', 'root', 'Chouchou.44', {
>>>>>>> refs/remotes/origin/main
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