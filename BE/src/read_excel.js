const { json } = require('express');
const { DATE } = require('sequelize');
const xlsx = require('xlsx');
import * as services from './services';



const formatDate = (dateString) => {
  const [day, month, year] = dateString.split('/');
  const date = new Date(`20${year}-${month}-${day}`);
  const formattedDate = date.toISOString().split('T')[0];
  return formattedDate;
}
const getDaysBetween = (startDate, endDate) => {
  const start = new Date(formatDate(startDate));
  const end = new Date(formatDate(endDate));

  const daysArray = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear().toString().slice(-2);
    // if (`${day}/${month}/${year}` != startDate && `${day}/${month}/${year}` != endDate)
    daysArray.push(`${day}/${month}/${year}`);
  }

  return {
    totalDays: daysArray.length,
    daysList: daysArray
  };
}
export const insert = async () => {
  const mapClassPeriod = new Map();
  const set_response_users = new Set();
  const set_response_discipline = new Set();


  const mapUser = new Map();
  const mapMH = new Map();
  const mapClass = new Map();
  const mapRoom = new Map();
  const map_room_status = new Set();

  const response_class_period = await services.selectData('select *from  class_period cp ');
  const response_rooms = await services.selectData('select *from  room r');
  const response_users = await services.selectData('select *from users u ');
  const response_discipline = await services.selectData('select *from discipline d');

  if (response_users.message) {
    response_users.message.forEach((e => {
      set_response_users.add(e.mscb);
      const jsCB = {
        user_id: e.user_id,
        fullname: e.fullname
      }
      mapUser.set(e.mscb, jsCB);
    }))
  }

  if (response_discipline.message) {
    response_discipline.message.forEach((e => {
      set_response_discipline.add(e.discipline_id);
      mapMH.set(e.discipline_id, e.discipline_name);
    }))
  }
  if (response_class_period) {
    const data = response_class_period.message;
    data.forEach((e => {
      const key = e.details;
      const value = e.class_period_id;
      if (!mapClassPeriod.has(key)) {
        mapClassPeriod.set(key, []);
      }

      mapClassPeriod.get(key).push(value);
    }))

  }



  // const workbook = xlsx.readFile('E:/HK1_24-25_TKB PHÒNG MÁY.xlsm'); // Đường dẫn tới tệp Excel
  const workbook = xlsx.readFile('C:/Users/Admin/Desktop/TKB HK2 (24-25)_PHONG MAY_KHOA CNTT_2025.01.09.xlsx');
  // Lấy danh sách các tên sheet
  const sheetNames = workbook.SheetNames;


  const allData = sheetNames
    .filter(sheetName => sheetName.trim() !== "TKB_Chung" && sheetName.trim() !== "Data") // Lọc các sheet cần bỏ qua
    .map(sheetName => {
      const worksheet = workbook.Sheets[sheetName]; // Lấy worksheet theo tên
      const data = xlsx.utils.sheet_to_json(worksheet); // Chuyển dữ liệu sang JSON
      return { sheetName, data }; // Trả về tên sheet và dữ liệu
    });



  // Hiển thị dữ liệu từ tất cả các sheet
  let i = response_users.message.length + 1;
  let rooms = 1;
  let insert_room = `INSERT INTO room (room_id,room_name) values \n`;
  let t_room = '';
  let id_arr = 1;
  allData.map(data => {
    if (data.sheetName.trim() != "TKB_Chung" && data.sheetName.trim() != 'Data') {
      const data_sheet = data.data;
      if (data_sheet.length >= 0) {
        if (response_rooms.message.length == 0)
          t_room = t_room + `(${rooms},'Phòng ${rooms}'), \n`;

        data_sheet.map(d => {
          if (d.MSCB != undefined && !mapUser.has(d.MSCB)) {
            const jsCB = {
              user_id: i,
              fullname: d['Cán bộ giảng dạy']
            }
            mapUser.set(d.MSCB, jsCB);
            i++;
          }
          if (d.MAMH != undefined) {
            mapMH.set(d.MAMH, d['Tên môn học']);
          }
          const jsClass = [d.MAMH, d['Nhóm'], d['Thứ'], d['Tiết học'], d['Thời gian học']];
          let start_time = '';
          let end_time = '';
          if (!mapClass.has(jsClass)) {
            let ht_index = 1;
            const ht = d['Hiện trạng'];

            if (ht == 'Bù') {
              ht_index = 3
            }
            else if (ht == 'Mượn') {
              ht_index = 4;
            }
console.log(`d['Thời gian học'].trim(): ${d['Thời gian học']}`)
            const time = d['Thời gian học'].trim()|| undefined;
            start_time = d['Thời gian học'].substring(0, time.indexOf('-')).trim();
            end_time = d['Thời gian học'].substring(time.indexOf('-') + 1, time.length).trim();
            const jsIfClass = {
              MSCB: d.MSCB,
              room_id: rooms,
              class_name: d['Lớp'],
              thu: d['Thứ'],
              time: d['Tiết học'],
              start_time: start_time,
              end_time: end_time,
              status_id: ht_index
            }
            mapClass.set(jsClass, jsIfClass);

          }
          // console.log('hiện trạng: ',d['Hiện trạng'] !== undefined)
          // if (d['Hiện trạng'] !== undefined && d['Hiện trạng'] !== null && d['Hiện trạng'] !== '') {
          //   if()
          //   const result = getDaysBetween(start_time, end_time);
          //   const arr = result.daysList;
          //   const arr_length = result.totalDays
          //   arr.map(e => {
          //     if (d.MSCB !== undefined) {
          //       // if (d.MSCB !== undefined ) {
          //       // console.log('rooms: ', rooms)
          //       const js = {
          //         id: id_arr,
          //         arr_length: arr_length,
          //         room_id: rooms,
          //         MASCB: d.MSCB,
          //         status_id: ht_index,
          //         day_create: e
          //       }
          //       id_arr++;
          //       map_room_status.add(js);
          //     }
          //   })
          // }
        })
        rooms++;
      }


    }

  })


  let insert_user = `INSERT INTO users (user_id,MSCB,fullname,password,email) values \n`;
  let insert_user_roles = `INSERT INTO user_role (id,user_id,role_id) values \n`;
  let t_user = '';
  let t_user_roles = '';
  let dem_user_roles = response_users.message.length + 1;

  for (const [key, value] of mapUser.entries()) {
    if (value.user_id > set_response_users.size) {
      t_user = t_user + `(${value.user_id}, '${key}', '${value.fullname}', '$2b$10$CaR/atFpK4fX4HUmCWYoy.DCZZE7OvHTCABaysTvSmJCKe13owjPi', ''),\n`;
      t_user_roles = t_user_roles + `(${dem_user_roles},${value.user_id},2),\n`;
      dem_user_roles++;
    }

  }

  let insert_disipline = `INSERT INTO discipline (discipline_id,discipline_name) VALUES \n`;
  let t_discipline = '';
  for (const [key, value] of mapMH.entries()) {
    if (!set_response_discipline.has(key))
      t_discipline = t_discipline + `('${key}','${value}'),\n`;
  }

  let insert_class = `INSERT INTO  class_room (class_room_id,room_id,group_id, discipline_id, user_id, class_name, thu, class_period_id, start_time, end_time,status_id) VALUES \n`
  let t_class = '';
  let dem_class = 1;
  let dem_search = 1;

  let insert_user_status = `INSERT INTO user_status (id,class_room_id,user_id,status_id,room_id,day_create) VALUES \n`;
  let t_user_status = '';
  let i_user_status = 1;
  const addedRecords = new Set();
  for (const [key, value] of mapClass.entries()) {
    const value_user = mapUser.get(value.MSCB);
    const keyToSearch = value.time.match(/\d+/)[0];
    const periods = mapClassPeriod.get(keyToSearch);

    periods.forEach(e => {
      const key1 = key[1] ? `'${key[1]}'` : null;
      const key0 = key[0] ? `'${key[0]}'` : null;
      const class_name = value.class_name ? `'${value.class_name}'` : null
      const roomId = value.room_id || null;

      t_class += `(${dem_class},${roomId},${key1},${key0},${value_user ? value_user.user_id : null},${class_name},'${value.thu}',${e},'${value.start_time}','${value.end_time}',${value.status_id}),\n`;
      let dem_length_map_room_status = 0;
      for (let e of map_room_status) {
        if (dem_length_map_room_status == e.arr_length) {
          dem_length_map_room_status = 0;
          break;
        }
        const check = mapUser.get(e.MASCB);

        if (value_user !== undefined) {
          const recordKey = `${e.id}`;
          if (!addedRecords.has(recordKey) && value_user.user_id === check.user_id && (formatDate(value.start_time) < formatDate(e.day_create) && formatDate(e.day_create) < formatDate(value.end_time))) {
            t_user_status += `(${i_user_status},${dem_class},${check.user_id ? check.user_id : null},${e.status_id},${e.room_id},'${e.day_create}'),\n`;
            addedRecords.add(recordKey);
            i_user_status++;
            dem_length_map_room_status++;
          }
        }

      }

      dem_class++;
    });
  }




  const room = insert_room + t_room.trim().substring(0, t_room.lastIndexOf(','));
  const users = insert_user + t_user.substring(0, t_user.lastIndexOf(','));
  const user_roles = insert_user_roles + t_user_roles.substring(0, t_user_roles.lastIndexOf(','));
  const disipline = insert_disipline + t_discipline.substring(0, t_discipline.lastIndexOf(','));
  const class_rooms = insert_class + t_class.trim().substring(0, t_class.lastIndexOf(','));
  const user_status = insert_user_status + t_user_status.trim().substring(0, t_user_status.lastIndexOf(','));
  console.log('user_status: ', user_status)
  try {

    // console.log('date: ',(formatDate() < formatDate(e.day_create)))

    if (t_room)
      await services.InsertDatabase(room);
    if (t_user)
      await services.InsertDatabase(users);
    if (t_user_roles)
      await services.InsertDatabase(user_roles);
    if (t_discipline)
      await services.InsertDatabase(disipline);

    if (t_class)
      await services.InsertDatabase(class_rooms);

    // if (t_user_status)
    //   await services.InsertDatabase(user_status);
  } catch (error) {
    console.log('error insert user: ' + error)
  }



}

