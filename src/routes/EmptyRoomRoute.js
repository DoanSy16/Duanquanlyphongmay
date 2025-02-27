import * as controllers from '../controllers';
import express from 'express';
import verifyToken from '../middlewares/veryfi_token';
const router =express.Router();
router.use(verifyToken)
// router.post('/',controllers.loadHome);
// router.get('/loaddatadk',controllers.load_DK);
router.post('/load-data-empty-room',controllers.load_DK);

module.exports= router;