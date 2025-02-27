'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserStatus extends Model {

    static associate(models) {
      // UserStatus.belongsTo(models.User, {
      //   foreignKey: 'user_id'
      // });
    }
  }
  UserStatus.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER,
    day_create: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserStatus',
    tableName: 'user_status',
    timestamps: false,
    freezeTableName: true
  });
  return UserStatus;
};