import dotenv from 'dotenv'

dotenv.config()

// Create our client with the needed options
// const client = new JwksClient({
//     jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
//     strictSsl: true,
//     json: true
//   })

export default {
        endpoint: process.env.COSMOS_ENDPOINT,
        port: process.env.PORT,
        key: process.env.PRIMARY_KEY,
        databaseName: process.env.DATABASE_NAME,
        notesContainerName: process.env.NOTES_CONTAINER_NAME,
        usersContainerName: process.env.USERS_CONTAINER_NAME,
        devUrls: [
            process.env.DEV_URL,
            process.env.DEV_URL2,
            process.env.DEV_URL3,
            process.env.DEV_URL4
        ],
        // client
    }
