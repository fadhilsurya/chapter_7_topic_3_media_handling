const express = require('express')
require('dotenv').config()

const app = express()
const router = require('./route/routes')

app.use(express.json())

app.use('/', router)

app.listen(process.env.PORT || 3000, () => {
    console.log(`live and well in port ${process.env.PORT || 3000}`)
})