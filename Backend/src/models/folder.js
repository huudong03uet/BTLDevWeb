const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Pen = require('./pen');
const Collection = require('./collection');

const CollectionPen = sequelize.define('collection_pen', {
    collection_pen_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    }
  },
  {
    tableName: 'collection_pen',
  }
);

CollectionPen.belongsTo(Collection, {foreignKey : 'collection_id'});
CollectionPen.belongsTo(Pen, {foreignKey : 'pen_id'});

module.exports = CollectionPen;
