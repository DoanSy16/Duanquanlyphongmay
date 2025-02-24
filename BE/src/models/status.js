'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Status.belongsToMany(models.User,{through:models.UserStatus,foreignKey:'status_id'});
    }
  }
  Status.init({
    status_id: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    status_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Status',
    tableName: 'status',
    timestamps: false,
    freezeTableName: true
  });
  return Status;
};