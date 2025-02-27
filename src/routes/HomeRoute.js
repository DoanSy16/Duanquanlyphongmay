import * as controllers from '../controllers';
import express from 'express';
// import verifyToken from '../middlewares/veryfi_token'
const router =express.Router();
// router.use(verifyToken)
router.post('/',controllers.loadHome);
router.post('/load_data_all_week',controllers.load_data_all_week);
// router.get('/loaddatadk',controllers.load_DK);
// router.get('/load-data-empty-room',controllers.load_DK);

module.exports= router;
// export default router;