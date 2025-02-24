import sequelize from '../connection_database';
import { QueryTypes } from 'sequelize';

export const load_data_user_service = () => new Promise(async (resolve, reject) => {
    try {
        const response = await sequelize.query(`select u.* from users u 
            inner join user_role ur on u.user_id =ur.user_id where ur.role_id <>1`, {
            type: QueryTypes.SELECT,
        });

        if (!response || response.length === 0) {
            resolve({
                err: -1,
                message: response
            });
            return;
        }

        resolve({ message: 'find successfully', data: response });
    } catch (error) {
        reject(error)
        console.log("error in load_data_user_service: " + error)
    }
});

export const load_data_class_room_service = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await sequelize.query(`
        select 
		cr.class_room_id,
		cr.thu ,
		r.room_id,
		r.room_name::text, 
		d.discipline_id,
		d.discipline_name::text,
		u.fullname::text,
        cp.class_period_id,
		cp.class_period_name::text,
		cp.details::text as time_discipline,
		u.user_id::text as id_gv,
		cr.class_name,
		cr.start_time,
		cr.end_time,
		CASE 
			when   TO_CHAR(now(), 'DD/MM/YY')like us.day_create 
			THEN us.status_id::text         
			ELSE cr.status_id ::text
		END AS status,
		 st.status_name::text  AS status_name
		from class_room cr
		inner join room r on cr.room_id = r.room_id 
		left join discipline d on cr.discipline_id =d.discipline_id 
		left join users u on cr.user_id =u.user_id 
		LEFT join class_period cp on cr.class_period_id =cp.class_period_id
		LEFT join user_status us ON cr.class_room_id = us.class_room_id and us.day_create =  TO_CHAR(now(), 'DD/MM/YY')
		left join status st on us.status_id = st.status_id or cr.status_id =st.status_id 
		where cr.room_id =${id}
        order by cr.class_room_id    
            `, {
            type: QueryTypes.SELECT,
        });

        if (!response || response.length === 0) {
            resolve({
                err: -1,
                message: response
            });
            return;
        }

        resolve({ message: 'find successfully', data: response });
    } catch (error) {
        reject(error)
        console.log("error in load_data_class_room_service: " + error)
    }
});

export const load_data_all_service = (select) => new Promise(async (resolve, reject) => {
    try {
        const response = await sequelize.query(select, {
            type: QueryTypes.SELECT,
        });

        if (!response || response.length === 0) {
            resolve({
                err: -1,
                message: response
            });
            return;
        }

        resolve({ message: 'find successfully', data: response });
    } catch (error) {
        reject(error)
        console.log("error in load_data_all_service: " + error)
    }
});


export const insert_new_data_class_room = ({
    userId,
    roomId,
    disciplineId,
    thu,
    classPeriodId,
    statusId,
    start_time,
    end_time
}) => new Promise(async (resolve, reject) => {
    try {

        console.log(  userId,
            roomId,
            disciplineId,
            thu,
            classPeriodId,
            statusId,
            start_time,
            end_time)
        const response = await sequelize.query(
            `SELECT InsertClassRoom(${userId}, ${roomId},'${disciplineId}','${thu}',${classPeriodId},${statusId}, '${start_time}','${end_time}')AS result
                `,
            { type: QueryTypes.SELECT }
        );

        if (!response || response.length === 0) {
            resolve({
                err: -1,
                message: response
            });
            return;
        }

        resolve({ message: 'insert_new_data_class_room successfully', data: response[0].result });
    } catch (error) {
        reject(error)
        console.log("error in insert_new_data_class_room: " + error)
    }
});


export const delete_data_class_room = ({
    class_room_id
}) => new Promise(async (resolve, reject) => {
    try {
        const response = await sequelize.query(
            `delete from class_room where class_room_id =${class_room_id} `,
            { type: QueryTypes.RAW }
        );

        if (!response || response.length === 0) {
            resolve({
                err: -1,
                message: response
            });
            return;
        }

        resolve({ message: 'delete_data_class_room successfully', data: response });
    } catch (error) {
        reject(error)
        console.log("error in insert_new_data_class_room: " + error)
    }
});

export const load_data_search_class_room_service = ({fullname}) => new Promise(async (resolve, reject) => {
    try {
        const response = await sequelize.query(`
        select 
		cr.class_room_id,
		cr.thu ,
		r.room_id,
		r.room_name::text, 
		d.discipline_id,
		d.discipline_name::text,
		u.fullname::text,
        cp.class_period_id,
		cp.class_period_name::text,
		cp.details::text as time_discipline,
		u.user_id::text as id_gv,
		cr.class_name,
		cr.start_time,
		cr.end_time,
		CASE 
			when   TO_CHAR(now(), 'DD/MM/YY')like us.day_create 
			THEN us.status_id::text         
			ELSE cr.status_id ::text
		END AS status,
		 st.status_name::text  AS status_name
		from class_room cr
		inner join room r on cr.room_id = r.room_id 
		left join discipline d on cr.discipline_id =d.discipline_id 
		left join users u on cr.user_id =u.user_id 
		LEFT join class_period cp on cr.class_period_id =cp.class_period_id
		LEFT join user_status us ON cr.class_room_id = us.class_room_id and us.day_create =  TO_CHAR(now(), 'DD/MM/YY')
		left join status st on us.status_id = st.status_id or cr.status_id =st.status_id 
		where LOWER(u.fullname) LIKE LOWER('%${fullname.trim()}%')
        order by cr.class_room_id    
            `, {
            type: QueryTypes.SELECT,
        });

        if (!response || response.length === 0) {
            resolve({
                err: -1,
                message: response
            });
            return;
        }

        resolve({ message: 'find successfully', data: response });
    } catch (error) {
        reject(error)
        console.log("error in load_data_search_class_room_service: " + error)
    }
});

export const load_data_user_offline = () => new Promise(async (resolve, reject) => {
    try {
        const response = await sequelize.query(`
            select 
            u.user_id,
            u.fullname,
            cr.thu,
            cp.details,
            cr.start_time,
            cr.end_time,
            us.day_create,
            s.status_name 
            from users u 
            inner join class_room cr on u.user_id =cr.user_id 
            inner join class_period cp on cr.class_period_id =cp.class_period_id 
            inner join user_status us on u.user_id =us.user_id  and us.class_room_id =cr.class_room_id 
            inner join status s on s.status_id =us.status_id
             `, {
            type: QueryTypes.SELECT,
        });

        if (!response || response.length === 0) {
            resolve({
                err: -1,
                message: response
            });
            return;
        }

        resolve({ message: 'find successfully', data: response });
    } catch (error) {
        reject(error)
        console.log("error in load_data_all_service: " + error)
    }
});