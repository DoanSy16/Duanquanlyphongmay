'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Room.hasMany(models.User,{foreignKey:'user_id'});
    }
  }
  Room.init({
    class_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true
    },
    group_id:{
      type:DataTypes.INTEGER
    },
    discipline_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id:{
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    class_name: DataTypes.STRING,
    thu: DataTypes.STRING,
    time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Class',
    tableName:'class',
    freezeTableName:true,
    timestamps:false
  });
  return Room;
};