/**
 * @file userController.js
 * @description sign up and login
 * @author Tad Decker
 * 
 * 11/13/2023
 */

import userModel from "../models/userModel.js"
import { apiBadRequestError } from "../utils/apiUtils.js"

const userController = {
    signup(req, res) {
        body = req.body
        if (!body) {
            apiBadRequestError(res, 'Body is required')
            return
        }
        const username = body.username
        const password = body.password
        
        if (!username || !password) {
            apiBadRequestError(res, 'Missing username or password')
            return
        }

        userModel.signup(username, password)
        res.send('User signed up!')
    },

    login(req, res) {
        res.send('This will login the user.')
    }
}

export default userController
