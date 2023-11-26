/**
 * @file apiRoutes.js
 * @description The router for the API. Defines which routes lead to what controllers.
 * @author Tad Decker
 * 
 * 11/13/2023
 */

import express from 'express'
import userController from '../controllers/userController.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello world!')
})

router.post('/signup', userController.signup)
router.post('/login', userController.login)

export default router
