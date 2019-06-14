const express = require('express')
const helmet =  require('helmet')

const projects = require('../projects/projects_router')

const server = express()

server.use(express.json())
server.use(helmet())

server.use('/projects', projects)

module.exports = server