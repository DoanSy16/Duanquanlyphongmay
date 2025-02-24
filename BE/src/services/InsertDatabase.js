import sequelize from '../connection_database';
import { QueryTypes } from 'sequelize';;

//insert user

export const InsertDatabase = async (insert) => {
    try {
        const result = await sequelize.query(insert, {
            type: QueryTypes.INSERT,
        });

        console.log("Insert User successful:", result);
        // return { message: 'Insert User successfully', status: 'success' };
    } catch (error) {
        console.error("Insert User failed:", error);
        // throw error; // Quăng lỗi để hàm gọi xử lý
    }
};

export const selectData = async (select) => {
    try {

        const result = await sequelize.query(select, {
            type: QueryTypes.SELECT,
        });

        // console.log("select class_period successful:", result);
        return { message: result, status: 'success' };
    } catch (error) {
        console.error("select class_period failed:", error);
        // throw error; // Quăng lỗi để hàm gọi xử lý
    }
};
//inser user_roles
// export const insertUserRoles = async ( insert) => {
//     try {
//         const result = await sequelize.query(insert, {
//             type: QueryTypes.INSERT,
//         });

//         console.log("Insert User successful:", result);
//         // return { message: 'Insert User successfully', status: 'success' };
//     } catch (error) {
//         console.error("Insert User failed:", error);
//         // throw error; // Quăng lỗi để hàm gọi xử lý
//     }
// };

// export const insertUser = async ( user_id,MSCB, fullname) => {
//     try {
//         const result = await sequelize.query(`
//             INSERT INTO users (user_id,MSCB,fullname,password,email) values 
//             VALUES (:user_id, :MSCB, :fullname, '12345678', '')
//         `, {
//             replacements: {user_id,MSCB, fullname},
//             type: QueryTypes.INSERT,
//         });

//         console.log("Insert User successful:", result);
//         // return { message: 'Insert User successfully', status: 'success' };
//     } catch (error) {
//         console.error("Insert User failed:", error);
//         // throw error; // Quăng lỗi để hàm gọi xử lý
//     }
// };

//insert Desipline
export const insertDesipline = async (discipline_id, discipline_name) => {
    try {
        const result = await sequelize.query(`
            INSERT INTO discipline (discipline_id,discipline_name) values 
            VALUES (:discipline_id, :discipline_name) `, {
            replacements: { discipline_id, discipline_name },
            type: QueryTypes.INSERT,
        });

        // console.log("Insert successful:", result);
        return { message: 'Insert Desipline successfully', status: 'success' };
    } catch (error) {
        console.error("Insert Desipline failed:", error);
        throw error; // Quăng lỗi để hàm gọi xử lý
    }
};

//insert Class
export const insertClass = async (class_id, discipline_id, user_id, class_name, thu, time, start_time, end_time) => {
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

//insert notifications 
export const insertNotifications = async (user_id, status_id, status_room, room_id, class_period_id, thu, day_create, start_day, end_day, description,day_choose) => {
    try {
        // const result = await sequelize.query(`
        //     insert into  notifications (user_id,status_id,status_room,room_id,class_period_id,thu,day_create,start_day,end_day,description,day_choose)
        //     values (:user_id, :status_id, :status_room, :room_id, :class_period_id, :thu, :day_create, :start_day, :end_day, :description,:day_choose)
        // `, {
        //     replacements: { user_id, status_id, status_room, room_id, class_period_id, thu, day_create, start_day, end_day, description,day_choose },
        //     type: QueryTypes.INSERT,
        // });

        const result = await sequelize.query(`
            select *from  insert_notifications_and_return(:user_id, :status_id, :status_room, :room_id, :class_period_id, :thu, :day_create, :start_day, :end_day, :description,:day_choose)
        `, {
            replacements: { user_id, status_id, status_room, room_id, class_period_id, thu, day_create, start_day, end_day, description,day_choose },
            type: QueryTypes.SELECT,
        });

        console.log("Insert successful:", result);
        return { message: 'Insert successfully', status: 'success',data:result };
    } catch (error) {
        console.error("Insert failed:", error);
        throw error; // Quăng lỗi để hàm gọi xử lý
    }
};