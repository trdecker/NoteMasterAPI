const express = require('express')
const router = express.Router()
const noteController = require('../controllers/noteController')

router.get('/', (req, res) => {
    res.send('Hello world!')
})

router.get('/getNotes', noteController.getNotes)

module.exports = router