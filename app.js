import express from 'express'
import dotenv from 'dotenv'
import notesRouter from './src/routes/notesRouter.js'
import usersRouter from './src/routes/usersRouter.js'
import cors from 'cors'
import config from './src/config/config.js'

dotenv.config()
const port = config.port ?? 80 // Default to 80

const app = express()

const corsOptions = {
    origin: [config.devUrl],
    methods: 'GET, PUT, POST, DELETE, HEAD, PATCH, OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization'
}

app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.use(express.json())
app.use('/notes', notesRouter)
app.use('/users', usersRouter)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})