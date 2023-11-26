/**
 * @file userModel.js
 * @description Signing in and loging in
 * @author Tad Decker
 * 
 * TODO: Probably don't save passwords as plain text...
 * 11/13/2023
 */

import { generateId } from '../utils/commonUtils.js'
import { CosmosClient } from '@azure/cosmos'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'

const cosmosClient = new CosmosClient({ 
    endpoint: config.endpoint,
    key: config.key
})

const database = cosmosClient.database(config.databaseName)
const container = database.container(config.usersContainerName)

const saltRounds = 10

/**
 * @function getUser
 * @function signup
 * @function login
 */
export default {

    /**
     * @description Get a user based on their username
     * @param {String} userName 
     * @returns username
     */
    async getUser(username) {
        const querySpec = {
            query: 'select * from c where c.username = @username',
            parameters: [
                {
                    name: '@username',
                    value: username
                }
            ]
        }
        const { resources: items } = await container.items.query(querySpec).fetchAll()
        return items
    },

    /**
     * @param {String} username
     * @returns created user (and it should return an authtoken, too)
     */
    async signup(username, password) {
        const userId = generateId()
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const user = { userId, username, password: hashedPassword }
        await container.items.create(user)
        const token = jwt.sign(
            { userId: userId, username },
            config.key,
            { expiresIn: '3hr'}
        )
        
        return {username, userId, token}
    },

    /**
     * Check a username and password. If it matches, returns an authtoken.
     * @param {String} username 
     * @param {String} password 
     * @returns username, userId, and authtoken, OR null
     */
    async login(username, password) {
        console.log('In login')
        console.log(username, password)
        const users = await this.getUser(username)
        console.log(users)
        if (users.length == 0) return null // Bad username

        const user = users.at(0)

        const match = await bcrypt.compare(password, user.password)
        console.log(match)
        
        // If the password matches, return the authtoken
        if (match) {
            const token = jwt.sign(
                { userId: user.userId, username: user.username },
                config.key,
                { expiresIn: '3h' }
            )
            
            return { username, userId: user.userId, token }
        }

        return null // Invalid credentials
    }
}
