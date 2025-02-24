import { JSONB } from 'sequelize';
import * as services from '../services';
// const date = new Date('11/12/24');
// const week = ['CN', '2', '3', '4', '5', '6', '7'];
const client = require('../connection_redis');

export const loadHome = async (req, res) => {
    try {
        const { day } = req.body;
        console.log('day: ',day)
        const date = new Date();
        const d = `${date.getDate()}/${date.getMonth() + 1
            }/${(date.getFullYear().toString().substring(2, 4))}`;
        // if (new Date(day)== date) {
        //     const exists = await client.exists('load_data_home');
        //     if (!exists) {
        //         const response = await services.loadDataHome(day);
        //         const jsonString = JSON.stringify(response);
        //         await client.set('load_data_home', jsonString);
        //     }
        //     const getData = await client.get('load_data_home');
        //     return res.status(200).json(JSON.parse(getData));

        // } else {
            const response = await services.loadDataHome(day);
            return res.status(200).json(response);
        // }

    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'interval server error'
        })
    }
}

export const load_DK = async (req, res) => {
    try {
        const { day } = req.body;
        // const date = new Date();
        // const d = `${date.getDate()}/${date.getMonth() + 1
        //     }/${(date.getFullYear().toString().substring(2, 4))}`;
        //     console.log('------------',day == d)
        // if (day == d) {
        //     const response = await services.loadDataDk(day);
        //     const jsonString = JSON.stringify(response.messages);

        //     // Kiểm tra kích thước của chuỗi JSON
        //     const sizeInBytes = Buffer.byteLength(jsonString, 'utf8'); // Kích thước tính bằng byte
        //     console.log(`Size of response: ${sizeInBytes} bytes`);

        //     // Chuyển đổi sang kilobytes hoặc megabytes (nếu cần)
        //     const sizeInKB = sizeInBytes / 1024;
        //     const sizeInMB = sizeInKB / 1024;
        //     console.log(`Size of response: ${sizeInKB.toFixed(2)} KB (${sizeInMB.toFixed(2)} MB)`);
        // } else {
        const response = await services.loadDataDk(day);
        return res.status(200).json(response);
        // }
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'interval server error'
        })
    }
}

export const load_data_all_week = async(req,res)=>{
    try{
        const {day }=req.body;
        const response = await services.loadDataWeek(day);
        return res.status(200).json(response);
    }catch(error){
        return res.status(500).json({
            err: -1,
            mes: 'interval server error'
        })
    }
}


