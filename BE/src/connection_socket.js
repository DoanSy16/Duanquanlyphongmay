import { JSON, JSONB } from 'sequelize';
import * as services from '../src/services';
// const client = require('./connection_redis');
const userStorage = require('../src/storage/UserDetailsStorage');
export const connection_socket = (io) => {
  io.on('connection', (socket) => {


    socket.on('disconnect', () => {
      console.log('Client disconnected: ' + socket.id);
    });

    socket.on('error', (error) => {
      console.error('Socket error: ', error);
    });

    socket.on('test-event', (data) => {
      console.log('Received test-event with data: ', data);
    });

    // socket.emit('Server-send-data-messages1','dasdsd1ssss')

    socket.on('create-id-socket', (data) => {
      console.log('data: ', data)
      socket.join(data.message); // Join room with the user id
      socket.user_id = data.message;
      console.log('user_id: ', socket.user_id)
    });


    socket.on('load_data_all_home', (data) => {
      socket.emit('send_to_action_refresh_data', data);
    });

    socket.on('send_on_dk_room', async (data) => {
      try {
       const response= await services.insertNotifications(data.user_id, data.status_id, data.status_room, data.room_id, data.class_period_id, data.thu, data.day_create, data.start_day, data.end_day, data.description, data.day_choose)
        let refresh_data = await services.loadDataDk(data.day_choose);
        io.emit('send_to_action_refresh_data_emty_room', refresh_data.data);
        io.to('1').emit('send_data_emtyroom_notification', response.data);
      } catch (error) {
        console.log('err: ', error)
      }
    })



    const timer = setInterval(async () => {
      try {
        let time = '1';
        const sender_id = socket.user_id; // Lấy ID của user đã tạo socket
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const formattedTime = `${hours}:${minutes}`;
        const callApi = `${formattedTime}:${seconds}`;
        // console.log('formattedTime: ',callApi)
        // if (callApi == '22:30:00') {
        //   const year = (now.getFullYear().toString().substring(2, 4))
        //   const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        //   const date = String(now.getDate()).padStart(2, '0');
        //   const formattedDate = `${date}/${month}/${year}`;
        //   // const response_data_home= await services.loadDataHome(formattedDate);
        //   // const exists = await client.exists('load_data_home_day_now');
        //   // const response = await client.get('load_data_home_day_now');
        //   // console.log('res: ',exists)
        //     // client.del('load_data_home_day_now')
        //     // if(exists){
        //     //   console.log('co1')
        //     //   client.del('load_data_home_day_now')
        //     //     await client.set('load_data_home_day_now',response_data_home);
        //     // }

        // }
        if (formattedTime == '06:30') {
          time = 1;
        } else if (formattedTime == '09:00') {
          time = 2;
        } else if (formattedTime == '12:00') {
          time = 3;
        } else if (formattedTime == '14:30') {
          time = 4
        }

        if (time != '') {
          const onlineUsers = userStorage.findUsersByCondition(user => {
            if (user.class_period_name == time && sender_id == user.id) {
              const data = {
                room_name: user.room_name,
                discipline_name: user.discipline_name,
                fullname: user.fullname,
                class_period_name: user.class_period_name
              }
              io.to(sender_id).emit('send-notification-details', data);
            }
          });
        }

        // console.log('sender_id: ',sender_id)
        if (sender_id) {
          // const response = await services.countMessagesUnread(parseInt(sender_id));
          // io.to(sender_id).emit('timer-call-unread-messages', response.messages[0].count);
        }
      } catch (error) {
        console.error('Error in timer interval: ', error);
      }
    }, 1000); // Mỗi 10 giây

    //   socket.on('send-messages', async (data) => {
    //     const sender_id = parseInt(data.message.sender_id);
    //     const to_user = data.message.to_user;
    //     const response = await services.sendMessages(data.message);

    //     io.to(sender_id).emit('Server-send-data-messages', response);
    //     io.to(to_user).emit('Server-send-data-messages', response);

    //     updatePhoneBookFromUser(sender_id, to_user);
    //     updatePhoneBookToUser(sender_id, to_user);

    //     await countMessages(to_user);
    //   });

    //   socket.on('count-messages-un-read', async (data) => {
    //     await countMessages(data.message);
    //   });

    //   socket.on('update-status-messages', async (data) => {
    //     console.log(data.message)
    //     const sender_id = parseInt(data.message.sender_id);
    //     const to_user = parseInt(data.message.to_user);
    //     const response =await services.updateStatusMessages(sender_id,to_user);
    //     updatePhoneBookFromUser(sender_id, to_user);
    //     updatePhoneBookToUser(sender_id, to_user);
    //   });



    //   const updatePhoneBookFromUser = async (sender_id, to_user) => {
    //     const response_phone_book_from_id = await services.updatePhoneBook(sender_id, to_user);
    //     io.to(sender_id).emit('Server-send-data-phone-book-from-user', response_phone_book_from_id.messages);
    //   }

    //   const updatePhoneBookToUser = async (sender_id, to_user) => {
    //     const response_phone_book_to_id = await services.updatePhoneBook(to_user, sender_id);
    //     io.to(to_user).emit('Server-send-data-phone-book-to-user', response_phone_book_to_id.messages);
    //   }

    //   const countMessages = async (id) => {
    //     const sender_id = parseInt(id);
    //     const response = await services.countMessagesUnread(sender_id);
    //     io.to(sender_id).emit('call-count-messages-un-read', response.messages[0].count);
    //   }

  });
};