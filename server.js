const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })

const app = require('./app')

const DB_URI = process.env.MONGODBURL.replace('<password>', process.env.MONGODBPASSWORD)

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connection successful')
})

// Start server
const port = process.env.PORT || 3000
const host = process.env.HOST || 'localhost'
app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
})