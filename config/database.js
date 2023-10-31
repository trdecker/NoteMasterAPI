const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const { CosmosClient } = require('@azure/cosmos')

const URI = process.env.URI

function connect() {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    mongoose.connection.on('connected', () => {
        console.log(`Mongoose connected to ${URI}`)
    })

    mongoose.connection.on('disconnected', () => {
        console.log(`Mongoose disconnected`)
    })
}

module.exports = {
    connect,
    mongoose
}