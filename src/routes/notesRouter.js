/**
 * @file apiRoutes.js
 * @description The router for the API. Defines which routes lead to what controllers.
 * @author Tad Decker
 * 
 * 11/11/2023
 */

import express from 'express'
import notesController from '../controllers/noteController.js'

const router = express.Router()

router.get('/', notesController.getNotes)
router.post('/', notesController.createNote)
router.put('/', notesController.editNote)
router.delete('/', notesController.deleteNote)

export default router
