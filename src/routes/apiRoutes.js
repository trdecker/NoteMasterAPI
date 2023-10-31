const express = require('express')
const router = express.Router()
const noteController = require('../controllers/noteController')

router.get('/getNotes', noteController.getNotes)

module.exports = router