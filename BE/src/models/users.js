'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Nhiều User có thể có nhiều Role
      User.belongsToMany(models.Role, {
        through: models.UserRole,
        foreignKey: 'user_id'
      });
    }
  }

  User.init({
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    MSCB: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fullname: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
    freezeTableName: true
  });

  return User;
};
