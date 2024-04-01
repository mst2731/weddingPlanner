const express = require('express')
const app = express()
const morgan = require('morgan')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const helmet = require('helmet')


// used to set security HTTP headers
app.use(helmet())

if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
}

//use middle ware express.json() to add body property to req
//its good practise to limit amount data in req
app.use(express.json({ limit: '1mb' }))


// Adding routers
const venueRouter = require('./routes/venueRoute')
const vendorRouter = require('./routes/vendorRoute')
const userRouter = require('./routes/userRoute')
const reviewRouter = require('./routes/reviewRoute')
const favouriteRouter = require('./routes/favouriteRoute')


// use the routers
app.use('/api/venues', venueRouter)
app.use('/api/vendors', vendorRouter)
app.use('/api/users', userRouter)
app.use('/api/reviews', reviewRouter)
app.use('/api/favourites', favouriteRouter)

app.all('*', (req, res, next) => { // all for all methods (get, post, put, patch, delete)
    // '*' is for all api end points
    const err = new AppError(`Can't find ${req.originalUrl} on this server`, 404)
    next(err) // if we pass an arguement in next() nodeJS will use global error handling middleware in next step
  })
  
app.use(globalErrorHandler)

module.exports = app