import * as controllers from '../controllers'
import express from 'express'
// import verifyToken from '../middlewares/veryfi_token'
const router =express.Router()
// router.use(verifyToken)
router.post('/login',controllers.login)

module.exports= router