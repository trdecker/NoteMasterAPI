import Note from '../services/noteService.js'

const notesController = {
    async getAllNotes(req, res) {
        const notes = await Note.getAllNotes()
        const json = {
            notes: notes
        }
        res.json(notes)
    }
}

export default notesController
