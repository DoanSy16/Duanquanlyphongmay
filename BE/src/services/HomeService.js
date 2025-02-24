import sequelize from '../connection_database';
import { QueryTypes } from 'sequelize';
const userStorage = require('../storage/UserDetailsStorage');

export const loadDataHome = (current_time) => new Promise(async (resolve, reject) => {
    try {
        const response = await sequelize.query('select * from get_timetable(:current_time)', {
            replacements: { current_time },
            type: QueryTypes.SELECT,
        });

        if (!response || response.length === 0) {
            resolve({
                err: -1,
                message: response
            });
            return;
        }
        // console.log('response: ',response);

        response.forEach((e) => {
            const key = [e.id_gv, e.class_period_name];
            const model = {
                id: e.id_gv,
                room_name: e.room_name,
                discipline_name: e.discipline_name,
                fullname: e.fullname,
                class_period_name: e.class_period_name
            }
            userStorage.setUser(key, model)
        })

        resolve({ message: 'find successfully', messages: response });
    } catch (error) {
        reject(error)
        console.log("error in loadDataHome phone book: " + error)
    }
});


//Tạo function load dữ liệu phòng trống trong tuần 
export const loadDataDk = (now_date) => new Promise(async (resolve, reject) => {
    try {
        
        const select = `                        
        WITH day_series AS (
            SELECT generate_series(
                TO_DATE('${now_date}', 'DD/MM/YY')::date, 
                TO_DATE('${now_date}', 'DD/MM/YY')::date + INTERVAL '7 days', 
                '1 day'::INTERVAL
            )::DATE AS day_series
        )
        SELECT 
            TO_CHAR(ds.day_series, 'DD/MM/YY') as day,
            TO_CHAR(MIN(ds.day_series) OVER (), 'DD/MM/YY') AS min_date,
            TO_CHAR(MAX(ds.day_series) OVER (), 'DD/MM/YY') AS max_date,             
            ct.room_id,
            r.room_name,                
            ct.time,                  
            CASE 
                WHEN LAG(ct.room_id) OVER (ORDER BY  ct.room_id) IS DISTINCT FROM ct.room_id 
                THEN ct.room_id         
                ELSE NULL
            END AS status
        FROM day_series ds
        LEFT JOIN check_time(TO_CHAR(ds.day_series, 'DD/MM/YY')) AS ct
        INNER JOIN room r on ct.room_id = r.room_id
        ON TRUE 
        and 
        not exists (
       		select  1 from notifications ntf where 
        	TO_CHAR(ds.day_series, 'DD/MM/YY') = ntf.day_choose and ct.room_id = ntf.room_id and
        	ct.time = ntf.class_period_id::text
        )
        WHERE EXTRACT(DOW FROM ds.day_series) <> 0 and ct.room_id <>14 and ct.room_id <>15
        ORDER BY ct.room_id,ds.day_series,ct.time;
`;
        const response = await sequelize.query(select, {
            // replacements: { now_date },
            type: QueryTypes.SELECT,
        });
        console.log("now_date: " + now_date)
        console.log("now_date: " + response.length)
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
        console.log("error in load data dk book: " + error)
    }
});

//Tạo function lấy dữ liệu phòng học trong 1 tuần
export const loadDataWeek = (now_date) => new Promise(async (resolve, reject) => {
    try {
        // console.log("now_date1: " + now_date)
        const select = `                        
        WITH day_series AS (
                SELECT generate_series(
                    TO_DATE('${now_date}', 'DD/MM/YY')::date, 
                    TO_DATE('${now_date}', 'DD/MM/YY')::date + INTERVAL '7 days', 
                    '1 day'::INTERVAL
                )::DATE AS day_series
            )
            SELECT 
           
            TO_CHAR(ds.day_series, 'DD/MM/YY') 
                ,gt.*
            FROM 
                day_series ds,
                LATERAL get_timetable(TO_CHAR(ds.day_series, 'DD/MM/YY')) gt
            WHERE EXTRACT(DOW FROM ds.day_series) <> 0;
`;
        // CASE 
        //         WHEN LAG(ds.day_series) OVER (ORDER BY  ds.day_series) IS DISTINCT FROM ds.day_series 
        //         THEN TO_CHAR(ds.day_series, 'DD/MM/YY')   
        //         ELSE NULL
        //     END AS day_time

        const select_all_day = `SELECT 
                        TO_CHAR(day_series, 'DD/MM/YY') as day_of_week
                        FROM (
                            SELECT 
                                generate_series(
                                    TO_DATE('${now_date}', 'DD/MM/YY')::date, 
                                    TO_DATE('${now_date}', 'DD/MM/YY')::date + INTERVAL '6 days', 
                                    '1 day'::INTERVAL
                                )::DATE AS day_series
                        ) AS subquery
                         WHERE 
                            EXTRACT(DOW FROM day_series) <> 0
                        ORDER BY 
                            CASE 
                                WHEN EXTRACT(DOW FROM day_series) = 0 THEN 7 -- Chuyển Chủ Nhật (0) thành 7
                                ELSE EXTRACT(DOW FROM day_series)
                            END, 
                            day_series;`
        const response_all_day = await sequelize.query(select_all_day, {
            // replacements: { now_date },
            type: QueryTypes.SELECT,
        });
        const response = await sequelize.query(select, {
            // replacements: { now_date },
            type: QueryTypes.SELECT,
        });

        if ((!response || response.length === 0) || (!response_all_day || response_all_day.length === 0)) {
            resolve({
                err: -1,
                message: response,
                message_all_day: response_all_day
            });
            return;
        }

        const data = {
            data_all_day: response,
            day_series: response_all_day
        }

        resolve({ message: 'find successfully', data: data });
    } catch (error) {
        reject(error)
        console.log("error in load data all week book: " + error)
    }
});



