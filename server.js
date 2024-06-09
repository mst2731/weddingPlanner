const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })

const DB_URI = process.env.MONGODBURL.replace('<password>', process.env.MONGODBPASSWORD)

mongoose.connect(DB_URI).then(() => {
    console.log('MongoDB connected successfully')
})

const app = require('./app') //import express app

// Start server
const port = process.env.PORT || 3000
const host = process.env.HOST || 'localhost'
app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
})

process.on('unhandledRejection', err => {
    console.log(err.name, err.message, "its an unhandled promise rejection")
    //process.exit() shut down the server
    //0 means success
    //1 means uncaught expection occured
    //server.close grace fully completes the current requests and then closes
    server.close(() => {
        process.exit(1)
    })
})