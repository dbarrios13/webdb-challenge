const express = require('express')
const helmet =  require('helmet')

const projects = require('./projects/projects_router')

const server = express()

server.use(express.json())
server.use(helmet())

server.use('/projects', projects)

const port = 4000

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})