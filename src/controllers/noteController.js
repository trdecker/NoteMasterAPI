const Note = require('../models/noteModel')

function getNotes() {
    const docQuery = Note.find({})
    docQuery
        .exec()
        .then(notes => {
            res.status(200).json(notes)
        })
        .catch(error => {
            res.status(500).send(error)
            return
        })
}

module.exports = {
    getNotes
}