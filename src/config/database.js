import dotenv from 'dotenv'
import { CosmosClient } from '@azure/cosmos'

dotenv.config()

const endpoint = process.env.COSMOS_ENDPOINT
const key = process.env.PRIMARY_KEY
const DATABASE_NAME = process.env.DATABASE_NAME
const CONTAINER_NAME = process.env.CONTAINER_NAME

const cosmosClient = new CosmosClient({ 
    endpoint, 
    key
})

const database = cosmosClient.database(DATABASE_NAME)
const container = database.container(CONTAINER_NAME)

/**
 * @description get an item using an id
 * @param {String} id 
 * @returns Found items
 */
export async function getItem(id) {
    const querySpec = {
        query: 'select * from c where c.id=@id',
        parameters: [
            {
                name: '@id',
                value: id
            }
        ]
    }
    const { resources: items } = await container.items.query(querySpec).fetchAll()
    return items
}

/**
 * Get the notes belonging to a user
 * @param {String} userId 
 * @returns List of items associated with user
 */
export async function getUserNotes(userId) {
    const querySpec = {
        query: 'select * from c where c.userId = @userId',
        parameters: [
            {
                name: '@userId',
                value: userId
            }
        ]
    }
    const { resources: items } = await container.items.query(querySpec).fetchAll()
    return items
}

/**
 * @description Create a new item.
 * @param {Object} newItem 
 * @returns savedItem
 */
export async function createNote(newItem) {
    const { resource: savedItem } = await container.items.create(newItem)
    return savedItem
}

/**
 * @description Edit an existing item TODO: separate calls for each attribute? TODO: error handling for bad itemId
 * @param {String} itemId 
 * @param {Object} updatedItem 
 */
export async function editNote(itemId, updatedItem) {
    // const { resource: existingItem } = await container.item(itemId).read() // Skip this part?
    const { resource: replacedItem } = await container.item(itemId).replace(updatedItem)
    return replacedItem
}

/**
 * @description This WILL return a 204 on a success, not a 200!! TODO: Error handling for bad itemId
 * @param {String} itemId 
 * @return Status code
 */
export async function deleteNote(itemId) {
    const { statusCode } = await container.item(itemId).delete()
    return statusCode
}
