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
import config from '../config/config.js'

const cosmosClient = new CosmosClient({ 
    endpoint: config.endpoint, 
    key: config.key
})

const database = cosmosClient.database(config.databaseName)
const container = database.container(config.usersContainerName)

export default {

    async getUser(userName) {

    },

    /**
     * @param {String} username
     */
    async signup(username, password) {
        const userId = generateId()
        const user = { userId, username, password }
        const { resource: createdUser } = await container.items.create(user)
        return createdUser
    },

    login(username, password) {

    }
}
