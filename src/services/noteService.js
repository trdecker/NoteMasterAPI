import { getUserNotes, createNote, editNote, deleteNote } from '../config/database.js'
import { generateId } from '../utils/commonUtils.js'

const noteModel = {

    /**
     * Get the notes associated with a user
     * @param {String} userId 
     * @returns 
     */
    async getUserNotes(userId) {
        const notes = await getUserNotes(userId)
        return notes
    },

    async createNote(userId, newNote) {
        const id = generateId()
        const note = { userId, id, ...newNote }
        const createdItem = await createNote(note)
        return createdItem
    },

    async editNote(userId, noteId, newNote) {
        const note = {userId, id: noteId, ...newNote}
        const editedItem = await editNote(noteId, note)
        return editedItem
    },

    async deleteNote(noteId) {
        await deleteNote(noteId)
    }
}

export default noteModel