import { getAllItems } from '../config/database.js'

const noteModel = {
    async getAllNotes() {
        const notes = await getAllItems()
        return notes
    }
}

export default noteModel