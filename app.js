import express from 'express'
import dotenv from 'dotenv'
import apiRoutes from './src/routes/apiRoutes.js'

dotenv.config()
const port = process.env.PORT ?? 80

const app = express()
app.use(express.json())
app.use('/', apiRoutes)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})