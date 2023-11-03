const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const { CosmosClient } = require('@azure/cosmos')

const URI = process.env.URI
const key = process.env.key
const databaseName = process.env.databaseName
const containerName = process.env.containerName

const client = new CosmosClient({ URI, key })

const database = client.database(database)
const container = database.container(container)

module.exports = {
    database,
    container,
    mongoose
}
