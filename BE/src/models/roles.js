'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // Nhiều Role có thể thuộc về nhiều User
      Role.belongsToMany(models.User, {
        through: models.UserRole,
        foreignKey: 'role_id'
      });
    }
  }

  Role.init({
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    timestamps: false,
    freezeTableName: true
  });

  return Role;
};
