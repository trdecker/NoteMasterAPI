const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const { connect } = require('./config/database')

dotenv.config()
const port = process.env.PORT

// connect()

const apiRoutes = require('./routes/apiRoutes')
const app = express()
app.use(express.json())
app.use('/', apiRoutes)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})