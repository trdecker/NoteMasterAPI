/**
 * @file noteController.js
 * @description The controller for the routes found in apiRoutes.js. Includes creating, editting, deleting, and retrieving Notes.
 * @author Tad Decker
 * 
 * 11/11/2023
 */

import Note from '../models/noteModel.js'
import { apiBadRequestError, apiInternalError, apiNotFoundError } from '../utils/apiUtils.js'


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
            const userId = req.query.userId ?? null
            if (!userId) {
                apiNotFoundError(res, 'userId not found')
                return
            }

            const notes = await Note.getUserNotes(userId)
            const json = {
                notes: notes
            }
            res.json(json)
        } catch (e) {
            apiInternalError(res, 'Error getting notes', e)
        }
    },

    async createNote(req, res) {
        try {
            const userId = req.query.userId
            const newNote = req.body

            // Check for required fields
            if (!userId) {
                apiBadRequestError(res, 'User ID required')
                return
            }
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

            // Check authorization


            const createdItem = await Note.createNote(userId, newNote)
            res.json(createdItem)
        } catch (e) {
            apiInternalError(res, 'Error creating note', e)
        }
    },

    async editNote(req, res) {
        try {
            const note = req.body
            const userId = note?.userId ?? null
            const noteId = note?.id ?? null

            // Check for required fields
            if (!note) {
                apiBadRequestError(res, 'Body required')
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

            const editedItem = await Note.editNote(userId, noteId, note)
            res.json(editedItem)
        } catch (e) {
            apiInternalError(res, 'Error editing note', e)
        }
    },

    async deleteNote(req, res) {
        try {
            const userId = req.query.userId
            const noteId = req.query.noteId

            // Check for required fields
            if (!userId) {
                apiBadRequestError(res, 'User ID required')
                return
            }
            if (!noteId) {
                apiBadRequestError(res, 'Note ID required')
                return
            }
            
            await Note.deleteNote(noteId)
            res.send('Item deleted')
        } catch (e) {
            apiInternalError(res, 'Error deleting note', e)
        }
    }
}

export default notesController
