
import notesRouter from './src/routes/notesRouter.js'
import usersRouter from './src/routes/usersRouter.js'
import config from './src/config/config.js'
import express from 'express'
import cors from 'cors'
import { auth } from 'express-oauth2-jwt-bearer' // FIXME: need correct package name

dotenv.config()

const port = config.port ?? 80 // Default to 80
const app = express()

const corsOptions = {
    origin: [...config.devUrls],
    methods: 'GET, PUT, POST, DELETE, HEAD, PATCH, OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization'
}

const jwtCheck = auth({
    audience: config.audience,
    issuerBaseURL: config.issuerBaseURL,
    tokenSigningAlg: config.tokenSigningAlg
  })

// const corsOptions2 = {
//     origin: ['http://your-frontend-domain'],
//     methods: 'GET, PUT, POST, DELETE, HEAD, PATCH, OPTIONS',
//     credentials: true,
//     allowedHeaders: 'Content-Type, Authorization',
// };

app.use(cors(corsOptions))

app.use(jwtCheck)

app.get('/', (req, res) => {
    res.send('NoteMasterAPI by Tad Decker')
})

app.get('/authorized', function (_req, res) {
    res.send('Secured Resource')
})

app.use(express.json())
app.use('/notes', notesRouter)
app.use('/users', usersRouter)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})