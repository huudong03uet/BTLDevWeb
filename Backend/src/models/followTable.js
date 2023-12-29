const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const User = require('./user');

const Follow = sequelize.define('follow_table', {
    follow_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }
},
    {
        tableName: 'follow_table',
    }
);

Follow.belongsTo(User, { foreignKey: 'user_id_1' });
Follow.belongsTo(User, { foreignKey: 'user_id_2' });

module.exports = Follow;