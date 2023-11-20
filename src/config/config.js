import dotenv from 'dotenv'
dotenv.config()

export default {
        endpoint: process.env.COSMOS_ENDPOINT,
        port: process.env.PORT,
        key: process.env.PRIMARY_KEY,
        databaseName: process.env.DATABASE_NAME,
        notesContainerName: process.env.NOTES_CONTAINER_NAME,
        usersContainerName: process.env.USERS_CONTAINER_NAME,
        devUrl: process.env.DEV_URL
    }
