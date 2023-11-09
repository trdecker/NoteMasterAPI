import express from 'express'
import notesController from '../controllers/noteController.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello world!')
})

router.get('/allNotes', notesController.getAllNotes)

export default router