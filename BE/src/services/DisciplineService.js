import sequelize from '../connection_database';
import { QueryTypes } from 'sequelize';


// export const insert = ({ class_id, discipline_id, user_id, class_name, thu, time, start_time, end_time }) => new Promise(async (resolve, reject) => {
//     try {
//         // const query = ` insert into "class" (class_id,discipline_id,user_id,class_name,thu,time,start_time,end_time) values
//         //     (${class_id},${discipline_id},${user_id},${user_id},${thu},${time},${start_time},${end_time})`
//         // const search = await sequelize.query(query, {
//         //     // replacements: { id },
//         //     replacements: { class_id,discipline_id,user_id,class_name,thu,time,start_time,end_time},
//         //     type: QueryTypes.INSERT,
//         // });
//         const insert = await sequelize.query(`
//             insert into "class" (class_id,discipline_id,user_id,class_name,thu,time,start_time,end_time) values
//             (${class_id},${discipline_id},${user_id},${user_id},${thu},${time},${start_time},${end_time})
//             `, {
//             replacements: { class_id,discipline_id,user_id,class_name,thu,time,start_time,end_time},
//             type: QueryTypes.INSERT,
//         });

//         console.log(insert)
//         // if (!comments || comments.length === 0 ) {
//         //     resolve({
//         //         err: -1,
//         //         message: 'not found'
//         //     });
//         //     return;
//         // }

//         resolve({ message: 'find successfully', status: '' });
//     } catch (error) {
//         reject(error)
//         console.log("error insert: " + error)
//     }
// });
export const insert = async ( class_id, discipline_id, user_id, class_name, thu, time, start_time, end_time ) => {
    try {
        const result = await sequelize.query(`
            INSERT INTO "class" (class_id, discipline_id, user_id, class_name, thu, time, start_time, end_time) 
            VALUES (:class_id, :discipline_id, :user_id, :class_name, :thu, :time, :start_time, :end_time)
        `, {
            replacements: { class_id, discipline_id, user_id, class_name, thu, time, start_time, end_time },
            type: QueryTypes.INSERT,
        });

        console.log("Insert successful:", result);
        return { message: 'Insert successfully', status: 'success' };
    } catch (error) {
        console.error("Insert failed:", error);
        throw error; // Quăng lỗi để hàm gọi xử lý
    }
};

// export const select = async (user_id) => {
//     try {
//         console.log(`user_id: ${user_id}`)
//        await sequelize.query('SELECT * FROM users', { type: QueryTypes.SELECT })
//   .then((results) => {
//     console.log('Results:', results);
//   })
//   .catch((error) => {
//     console.error('Error executing query:', error);
//   });
//         // const result = await sequelize.query('select * from users u', {
//         //     replacements: {user_id},
//         //     type: QueryTypes.SELECT,
//         // });
// //        await sequelize.query('SELECT * FROM users', { type: sequelize.QueryTypes.SELECT })
// //   .then((results) => console.log(results))
// //   .catch((error) => console.error(error));
//         // console.log("Insert successful:", result);
//         return { message: 'Insert successfully', status: 'success' };
//     } catch (error) {
//         console.error("Insert failed:", error);
//         throw error; // Quăng lỗi để hàm gọi xử lý
//     }
// };