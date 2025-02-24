import * as controllers from '../controllers';
import express from 'express';
import verifyToken from '../middlewares/veryfi_token';
const router =express.Router();
router.use(verifyToken)
router.get('/load_data_notifications_awaiting_approval_admin',controllers.load_data_notifications_awaiting_approval_admin);
router.get('/load_count_notifications_awaiting_approval_admin',controllers.load_count_notifications_awaiting_approval_admin);
router.post('/insert_notifications_awaiting_approval_admin',controllers.insert_notifications_awaiting_approval_admin);

module.exports= router;