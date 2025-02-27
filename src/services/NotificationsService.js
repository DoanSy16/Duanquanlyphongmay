import { da } from 'date-fns/locale';
import sequelize from '../connection_database';
import { QueryTypes } from 'sequelize';

export const load_data_notifications_awaiting_approval_admin = () => new Promise(async (resolve, reject) => {
    try {
        const select = `
        select
            n.id,
            n.user_id,
            n.class_period_id,
            n.status_room,
            u.fullname,
            ns.status_name,
            s.status_name,
            n.room_id,
            cp.details,
            n.thu,
            n.day_choose, 
            n.day_create,
            n.start_day ,
            n.end_day ,
            n.status_room,
            n.status_id,
            n.description
            from notifications n inner join users u on u.user_id =n.user_id
            inner join notifications_status ns on ns.status_id =n.status_id 
            inner join status s on s.status_id =n.status_room 
            inner join class_period cp on cp.class_period_id =n.class_period_id
        `;
        const response = await sequelize.query(select, { type: QueryTypes.SELECT });
        if (!response || response.length === 0) {
            resolve({
                err: -1,
                message: response
            });
            return;
        }
        resolve({ message: 'load successfully', data: response });
    } catch (err) {
        reject(err)
        console.log('err in load_data_notifications_awaiting_approval_admin notificationsService: ', err);
    }
});



export const load_count_notifications_awaiting_approval_admin = () => new Promise(async (resolve, reject) => {
    try {
        const select = `select count(*) from notifications n where n.status_id =1`;
        const response = await sequelize.query(select, { type: QueryTypes.SELECT });
        if (!response || response.length === 0) {
            resolve({
                err: -1,
                message: response
            });
            return;
        }
        resolve({ message: 'load successfully', data: response });
    } catch (err) {
        reject(err)
        console.log('err in load_count_notifications_awaiting_approval_admin notificationsService: ', err);
    }
});


export const update_notifications_awaiting_approval_admin = (status_id,id) => new Promise(async (resolve, reject) => {
    try {
        const select = `update notifications set status_id =${status_id} where id =${id}`;
        const response = await sequelize.query(select, { type: QueryTypes.UPDATE });
        if (!response || response.length === 0) {
            resolve({
                err: -1,
                message: response
            });
            return;
        }
        resolve({ message: 'update successfully', data: response });
    } catch (err) {
        reject(err)
        console.log('err in update_notifications_awaiting_approval_admin notificationsService: ', err);
    }
})
