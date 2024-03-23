const express = require('express')
const app = express()
const morgan = require('morgan')

if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
}

//use middle ware express.json() to add body property to req
//its good practise to limit amount data in req
app.use(express.json({ limit: '10kb' }))

// add a simple get route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello from the server'
    })
})

module.exports = app