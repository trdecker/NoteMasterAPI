/**
 * @file apiRoutes.js
 * @description The router for the API. Defines which routes lead to what controllers.
 * @author Tad Decker
 * 11/11/ 2023
 * 
 * TODO: Login route to return AuthToken
 */

import express from 'express'
import notesController from '../controllers/noteController.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello world!')
})

// Notes api calls.
router.get('/notes', notesController.getNotes)
router.post('/notes', notesController.createNote)
router.put('/notes', notesController.editNote)
router.delete('/notes', notesController.deleteNote)

export default router