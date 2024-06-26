/**
 * @file noteController.js
 * @description The controller for the routes found in apiRoutes.js. Includes creating, editting, deleting, and retrieving Notes.
 * @author Tad Decker
 * 
 * 11/11/2023
 */

import { apiBadRequestError, apiForbiddenError, apiInternalError, apiNotFoundError } from '../utils/apiUtils.js'
import noteModel from '../models/noteModel.js'

/**
 * @function getNotes
 * @function createNote
 * @function editNote
 * @function deleteNote
 */
const notesController = {

    /**
     * Get the notes associated with the user ID
     * @param {Object} req 
     * @param {Object} res 
     */
    async getNotes(req, res) {
        try {
            console.log('in get notes')
            const { userId } = req.user
            const requestedUserId = req.query.userId ?? null

            // Limit scope to ONLY the user's own information!
            if (userId !== requestedUserId) {
                apiForbiddenError(res, 'Forbidden')
                return
            }

            // Return error if userId isn't found
            if (!userId) {
                apiNotFoundError(res, 'userId not found')
                return
            }

            const notes = await noteModel.getUserNotes(userId)

            res.json({ notes })
        } catch (e) {
            apiInternalError(res, 'Error getting notes', e)
        }
    },

    /**
     * @description Create a note. Requires the query "userId" and a body.
     * @param {Object} req 
     * @param {Object} res 
     */
    async createNote(req, res) {
        try {
            const { userId } = req.user
            const requestedUserId = req.query.userId
            const newNote = req.body

            // Limit scope to ONLY the user's own information!
            if (userId !== requestedUserId) {
                apiForbiddenError(res, 'Forbidden')
                return
            }

            // Check for required fields
            if (!requestedUserId) {
                apiBadRequestError(res, 'User ID required')
                return
            }
            if (!requestedUserId) {
                apiBadRequestError(res, 'Body required')
                return
            }

            // if (!newNote.title) {
            //     apiBadRequestError(res, 'title is a required field in the body')
            //     return
            // }

            // if (!newNote.body) {
            //     apiBadRequestError(res, 'body is a required field in the body')
            //     return
            // }

            const createdItem = await noteModel.createNote(userId, newNote)
            res.json(createdItem)
        } catch (e) {
            apiInternalError(res, 'Error creating note', e)
        }
    },

    /**
     * @param {Object} req 
     * @param {Object} res 
     * @returns 
     */
    async editNote(req, res) {
        try {
            const { userId } = req.user
            
            const newNote = req.body
            const noteId = newNote?.id ?? null

            // Check for required fields
            if (!newNote) {
                apiBadRequestError(res, 'Body required')
                return
            }

            if (!newNote.title) {
                apiBadRequestError(res, 'title is a required field in the body')
                return
            }

            if (!newNote.body) {
                apiBadRequestError(res, 'body is a required field in the body')
                return
            }

            if (!noteId) {
                apiBadRequestError(res, 'id is a required field in the body')
                return
            }

            // Check that note exists, and that the userId associated with that note is the user making the call
            const oldNote = await noteModel.getNote(noteId)

            if (!oldNote) {
                apiNotFoundError(res, 'Note does not exist')
                return
            }

            const requestedUserId = oldNote.userId
            
            // Limit scope to ONLY the user's own information!
            if (userId !== requestedUserId) {
                apiForbiddenError(res, 'Forbidden')
                return
            }

            if (!userId) {
                apiBadRequestError(res, 'User ID required')
                return
            }
            if (!noteId) {
                apiBadRequestError(res, 'Note ID required')
                return
            }

            const editedItem = await noteModel.editNote(userId, noteId, newNote)
            res.json(editedItem)
        } catch (e) {
            apiInternalError(res, 'Error editing note', e)
        }
    },

    /**
     * @description Delete a note belonging to a user
     * @param {Object} req 
     * @param {Object} res 
     */
    async deleteNote(req, res) {
        try {
            const { userId } = req.user
            const noteId = req.query.noteId

            const oldNote = await noteModel.getNote(noteId)
            if (!oldNote) {
                apiNotFoundError(res, 'Note does not exist')
                return
            }

            const requestedUserId = oldNote.userId
        
            // Limit scope to ONLY the user's own information!
            if (userId !== requestedUserId) {
                apiForbiddenError(res, 'Forbidden')
                return
            }

            // Check for required fields
            if (!userId) {
                apiBadRequestError(res, 'User ID required')
                return
            }
            if (!noteId) {
                apiBadRequestError(res, 'Note ID required')
                return
            }

            
            await noteModel.deleteNote(noteId)
            res.send('Note deleted')
        } catch (e) {
            apiInternalError(res, 'Error deleting note', e)
        }
    }
}

export default notesController
