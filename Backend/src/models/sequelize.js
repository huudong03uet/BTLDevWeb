const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('btl_web', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

sequelize.authenticate().then(() => {
  console.log('Kết nối cơ sở dữ liệu thành công.');
}).catch((error) => {
  console.error('Lỗi kết nối cơ sở dữ liệu:', error);
});

module.exports = sequelize;