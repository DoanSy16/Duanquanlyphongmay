const mongoose = require('mongoose');

const connectMongoDB = async () => {
  const dbHost = process.env.MongoDB_HOST;

  try {
    await mongoose.connect(dbHost, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Kết nối thành công tới MongoDB');
  } catch (error) {
    console.error('Kết nối tới MongoDB thất bại:', error.message);
  }

  mongoose.connection.on('connected', () => {
    console.log('Đã kết nối tới MongoDB');
  });

  mongoose.connection.on('error', (err) => {
    console.error('Lỗi kết nối MongoDB:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mất kết nối MongoDB');
  });
};

connectMongoDB();

module.exports = mongoose;
