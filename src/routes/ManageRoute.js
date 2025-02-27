import * as controllers from '../controllers';
import express from 'express';
import verifyToken from '../middlewares/veryfi_token';
const router =express.Router();
router.use(verifyToken)
// router.post('/',controllers.loadHome);
// router.get('/loaddatadk',controllers.load_DK);
router.get('/load/user',controllers.load_data_user_admin);
router.get('/load/room',controllers.load_data_room_admin);
router.get('/load/class_period',controllers.load_data_class_period_admin);
router.get('/load/discipline',controllers.load_data_discipline_admin);
router.get('/load/status',controllers.load_data_status_admin);
router.get('/load/data_user_offline',controllers.load_data_user_offline);
router.post('/load/class_room',controllers.load_data_class_room_admin);
router.post('/insert_data/class_room',controllers.insert_data_class_room);
router.post('/delete_data/class_room',controllers.delete_data_class_room);
router.post('/search_data/class_room',controllers.search_data_class_room);


module.exports= router;