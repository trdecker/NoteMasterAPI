
import notesRouter from './src/routes/notesRouter.js'
import usersRouter from './src/routes/usersRouter.js'
import config from './src/config/config.js'
import cors from 'cors'

dotenv.config()
const port = config.port ?? 80 // Default to 80

const app = express()

const corsOptions = {
    origin: [...config.devUrls],
    methods: 'GET, PUT, POST, DELETE, HEAD, PATCH, OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization'
}

// const corsOptions2 = {
//     origin: ['http://your-frontend-domain'],
//     methods: 'GET, PUT, POST, DELETE, HEAD, PATCH, OPTIONS',
//     credentials: true,
//     allowedHeaders: 'Content-Type, Authorization',
// };

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