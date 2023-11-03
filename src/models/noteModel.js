const mongoose = require('mongoose')

const Schema = mongoose.Schema

const noteSchema = new Schema({
    id: { type: String, required: true, unique: true },
    title: String,
    description: String
},
{
    collections: 'Notes'
}
)

const Note = mongoose.model('Note', noteSchema, 'Notes')

module.exports = Note