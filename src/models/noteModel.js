/**
 * @file noteModel.js
 * @description Model for interacting with Notes databse
 * @author Tad Decker
 * 
 * 11/11/2023
 * 
 * 2/29/2024
 * - Image and audio recording functonality
 */


import { generateId } from '../utils/commonUtils.js'
import { CosmosClient } from '@azure/cosmos'
import config from '../config/config.js'
// import { BlobServiceClient } from '@azure/storage-blob'

const cosmosClient = new CosmosClient({ 
    endpoint: config.endpoint, 
    key: config.key
})

// Connct to cosmosDB database
const database = cosmosClient.database(config.databaseName)
const container = database.container(config.notesContainerName)

// Paramters for blob storage
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
// const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString)
// const containerName = 'notemaster-images'
// const containerClient = blobServiceClient.getContainerClient(containerName)

// List all blobs in the container for debugging
// async function listBlobs() {
//   console.log('Blobs in the container:')
//   for await (const blob of containerClient.listBlobsFlat()) {
//     console.log(`- ${blob.name}`)
//   }
// }

// const uploadBlob = async (blobName, fileStream) => {
//     const blockBlobClient = containerClient.getBlockBlobClient(blobName)
//     await blockBlobClient.uploadAsync(fileStream)
//     console.log(`Blob ${blobName} uploaded successfully!`)
// }

// const deleteBlob = () => {

// }

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
        if (items.length === 0) return null
        else return items.at(0)
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
     * @description Create a new note belonging to a user. 
     * Images are saved to a Microsoft Azure blob container titled "notemaster-images"
     * Audio recordings are saved to a Microsoft Azure blob container titled "notemaster-audio"
     * @param {String} userId 
     * @param {Object} newNote 
     * @returns createdNote
     */
    async createNote(userId, newNote) {
        const id = generateId()
        const note = { userId, id, ...newNote }
        const { resource: createdNote } = await container.items.create(note)
        
        // Save images
        // for (const image of newNote?.images) {
        //     console.log(image?.fileName && image?.data)
        //     uploadBlob(image.fileName, image.data)
        // }
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
                
        // Save images
        // for (const image of newNote?.images) {
            // uploadBlob(image.fileName, image.data)
        // }
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

// userid: 17072365278015425
// noteId: 1708555176506909
