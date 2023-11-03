const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const { connect } = require('./config/database')
const apiRoutes = require('./src/routes/apiRoutes.js')


dotenv.config()
const port = process.env.PORT ?? 3000

// connect()

const app = express()
app.use(express.json())
app.use('/', apiRoutes)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})