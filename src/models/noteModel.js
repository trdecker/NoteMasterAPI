/**
 * @file noteModel.js
 * @description Model for interacting with Notes databse
 * @author Tad Decker
 * 
 * 11/11/2023
 */


import { generateId } from '../utils/commonUtils.js'
import { CosmosClient } from '@azure/cosmos'
import config from '../config/config.js'

const cosmosClient = new CosmosClient({ 
    endpoint: config.endpoint, 
    key: config.key
})

const database = cosmosClient.database(config.databaseName)
const container = database.container(config.notesContainerName)

/**
 * @function getNote get a single note, given an id
 * @function getUserNotes get a list of notes belonging to a user
 * @function createNote create a new note belonging to a user
 * @function editNote edit a pre-existing note
 * @function deleteNote delete a pre-existing note
 */
export default {

    /**
     * @description get an item using an id
     * @param {String} id 
     * @returns Found items
     */
    async getNote(id) {
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
    },

    /**
     * Get the notes associated with a user
     * @param {String} userId 
     * @returns 
     */
    async getUserNotes(userId) {
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
    },

    /**
     * @description Create a new note belonging to a user
     * @param {String} userId 
     * @param {Object} newNote 
     * @returns createdNote
     */
    async createNote(userId, newNote) {
        const id = generateId()
        const note = { userId, id, ...newNote }
        const { resource: createdNote } = await container.items.create(note)
        return createdNote
    },

    /**
     * @description update a pre-existing note
     * @param {String} userId 
     * @param {String} noteId 
     * @param {Object} newNote 
     * @returns updatedNote
     */
    async editNote(userId, noteId, newNote) {
        const note = {userId, id: noteId, ...newNote}
        const { resource: createdNote } = await container.item(noteId).replace(note)
        return createdNote
    },

    /**
     * @description delete a pre-existing note
     * @param {String} noteId 
     * @returns status code for deleting a note
     */
    async deleteNote(noteId) {        
        const { statusCode } = await container.item(noteId).delete()
        return statusCode
    }
}
