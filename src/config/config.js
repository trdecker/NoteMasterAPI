import dotenv from 'dotenv'
dotenv.config()

export default {
        endpoint: process.env.COSMOS_ENDPOINT,
        key: process.env.PRIMARY_KEY,
        databaseName: process.env.DATABASE_NAME,
        notesContainerName: process.env.NOTES_CONTAINER_NAME,
        usersContainerName: process.env.USERS_CONTAINER_NAME
    }
