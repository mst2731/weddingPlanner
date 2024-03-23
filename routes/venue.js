const express = require('express')
const router = express.Router()

router.route('/venues')
    .get((req, res) => {
        res.status(200).json({
            message: 'Venues route'
        })
    })

module.exports = router