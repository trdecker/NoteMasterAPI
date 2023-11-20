/**
 * @file userController.js
 * @description sign up and login
 * @author Tad Decker
 * 
 * 11/13/2023
 */

import userModel from "../models/userModel.js"
import { apiBadRequestError, apiForbiddenError } from "../utils/apiUtils.js"

const userController = {
    async signup(req, res) {
        const { body } = req
        if (!body) {
            apiBadRequestError(res, 'Body is required')
            return
        }
        
        const { username, password } = body
        
        if (!username || !password) {
            apiBadRequestError(res, 'Missing username or password')
            return
        }

        // If a username already exists, return a 403
        const users = await userModel.getUser(username)
        console.log(users)

        if (users.length > 0) {
            apiForbiddenError(res, 'Username already exists.')
            return
        }

        await userModel.signup(username, password)
        res.send('User signed up!')
    },

    async login(req, res) {
        const { body } = req
        if (!body) {
            apiBadRequestError(res, 'Body is required')
            return
        }

        const { username, password } = req.body

        if (!username || !password) {
            apiBadRequestError(res, 'Missing username or password')
            return
        }
        
        const authToken = await userModel.login(username, password)

        if (authToken) {
            res.json({ authToken })
        }
        else {
            apiForbiddenError(res, 'Invalid credentials')
        }
    }
}

export default userController
