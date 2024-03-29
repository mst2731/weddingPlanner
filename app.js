const express = require('express')
const app = express()
const morgan = require('morgan')

if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
}

//use middle ware express.json() to add body property to req
//its good practise to limit amount data in req
app.use(express.json({ limit: '10kb' }))


// Adding routers
const venueRouter = require('./routes/venueRoute')
const vendorRouter = require('./routes/vendorRoute')
const userRouter = require('./routes/userRoute')



// use the routers
app.use('/api/venues', venueRouter)
app.use('/api/vendors', vendorRouter)
app.use('/api/users', userRouter)

// error handling middleware
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    res.status(err.statusCode).json(err)
})

module.exports = app