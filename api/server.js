const express = require('express')
const helmet =  require('helmet')

const projects = require('../projects/projects_router.js')

const server = express()

server.use(express.json())
server.use(helmet())

server.use('/api/projects', projects)

module.exports = server