/**
 * @file userController.js
 * @description sign up and login
 * @author Tad Decker
 * 
 * 11/13/2023
 */

import userModel from "../models/userModel.js"
import { apiBadRequestError, apiForbiddenError } from "../utils/apiUtils.js"

/**
 * @function signup
 * @function login
 */
const userController = {
    /**
     * 
     * @param {Object} req 
     * @param {Object} res 
     * @returns 
     */
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

        if (users.length > 0) {
            apiForbiddenError(res, 'Username already exists.')
            return
        }

        const result = await userModel.signup(username, password)
        res.json(result)
    },

    /**
     * 
     * @param {Object} req 
     * @param {Object} res 
     * @returns 
     */
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
        
        const result = await userModel.login(username, password)

        if (result) {
            res.json(result)
        }
        else {
            apiForbiddenError(res, 'Invalid credentials')
        }
    }
}

export default userController
