const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const router = require('./router')
const app = express()

app.use(function (req, response, next) {
	response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Authorization");
	next()
})

// db setup
mongoose.connect('mongodb://localhost/proj18', function() {
    console.log('MongoDB connected.')
})

// app setup
app.use(morgan('tiny'))
app.use(bodyParser.json())
router(app)

// server setup
const port = process.env.port || 3000
const server = http.createServer(app)
server.listen(port)
console.log('Server listening on: ', port)