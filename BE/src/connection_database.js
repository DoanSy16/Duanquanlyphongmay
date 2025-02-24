// const  Sequelize  = require('sequelize');
import { Sequelize } from 'sequelize';
import { insert } from './read_excel';
// import * as services from './services';
// const services = require('./services')
 const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port:5432,
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true, // Yêu cầu SSL
      rejectUnauthorized: true // Tạm thời tắt kiểm tra chứng chỉ SSL (có thể cần chỉnh sửa cho môi trường sản xuất)
    }
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const connectionDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    // in
    // insert();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
connectionDatabase();


//  module.exports = sequelize;
export default sequelize;