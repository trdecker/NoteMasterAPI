import express from 'express'
import dotenv from 'dotenv'
import apiRoutes from './src/routes/apiRoutes.js'
import cors from 'cors'

dotenv.config()
const port = process.env.PORT ?? 80

const app = express()

const corsOptions = {
    origin: [process.env.DEV_URL],
    methods: 'GET, PUT, POST, DELETE, HEAD, PATCH',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization'
}

app.use(cors(corsOptions))

app.use(express.json())
app.use('/', apiRoutes)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})