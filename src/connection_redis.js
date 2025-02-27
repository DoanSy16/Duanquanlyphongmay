// const { createClient } = require('redis');
// const fs = require('fs');

// const client = createClient({
//   url: 'rediss://red-ct4t1jl2ng1s73a70m3g:2jqeugrsEIfQZHeMq2I8ocRy4wyGpiK1@oregon-redis.render.com:6379', // rediss chỉ ra rằng SSL được yêu cầu
//   socket: {
//     tls: true,
//     rejectUnauthorized: false, // Không kiểm tra CA (không khuyến khích trong sản xuất)
//     // ca: [fs.readFileSync('path/to/ca.crt')], // Chứng chỉ CA (khuyến khích trong sản xuất)
//     // key: fs.readFileSync('path/to/client.key'), // Khóa riêng (nếu có)
//     // cert: fs.readFileSync('path/to/client.crt'), // Chứng chỉ client (nếu có)
//   },
// });

// client.on('error', (err) => console.error('Redis SSL Error:', err));

// const connectRedis = async () => {
//   try {
//     await client.connect();
//     console.log('Đã kết nối tới Redis với SSL!');
//     // await client.set('load_data_home_day_now','asd')
   
//   } catch (err) {
//     console.error('Lỗi khi kết nối Redis:', err);
//   }
// };

// connectRedis();

// module.exports = client;







// // const { createClient } = require('redis');
// // const fs = require('fs');

// // const client = createClient({
// //   url: 'rediss://red-ct4t1jl2ng1s73a70m3g:2jqeugrsEIfQZHeMq2I8ocRy4wyGpiK1@oregon-redis.render.com:6379', // rediss chỉ ra rằng SSL được yêu cầu
// //   socket: {
// //     tls: true,
// //     rejectUnauthorized: false, // Không kiểm tra CA (không khuyến khích trong sản xuất)
// //     // ca: [fs.readFileSync('path/to/ca.crt')], // Chứng chỉ CA (khuyến khích trong sản xuất)
// //     // key: fs.readFileSync('path/to/client.key'), // Khóa riêng (nếu có)
// //     // cert: fs.readFileSync('path/to/client.crt'), // Chứng chỉ client (nếu có)
// //   },
// // });

// // client.on('error', (err) => console.error('Redis SSL Error:', err));

// // const connectRedis =(async () => {
// //   await client.connect();
// //   console.log('Đã kết nối tới Redis với SSL!');

// //   // Thực hiện các thao tác
// //   // await client.set('key', 'value');
// //   // console.log('GET key:', await client.get('key'));

// //   await client.quit();
// // })();

// // connectRedis();
// // module.exports = client;