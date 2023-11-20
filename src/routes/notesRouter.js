/**
 * @file apiRoutes.js
 * @description The router for the API. Defines which routes lead to what controllers.
 * @author Tad Decker
 * 
 * 11/11/2023
 */

import express from 'express'
import notesController from '../controllers/noteController.js'
import { requireAuth } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', requireAuth, notesController.getNotes)
router.post('/', requireAuth, notesController.createNote)
router.put('/', requireAuth, notesController.editNote)
router.delete('/', requireAuth, notesController.deleteNote)

export default router
