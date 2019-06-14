const db = require('./projects_model.js')
const actionDB = require('./actions_model.js')


const router = require('express').Router()

router.get('/:id', async(req, res) => {
    try {
        const project = await db.find(req.params.id)
        if(project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({
                message: 'The project with the specified ID does not exist'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving data for project'
        })
    }
})

router.post('/', async(req, res) => {
    try {
        const project = await db.add(req.body)
        res.status(201).json(project)
    } catch (error) {
        res.status(500).json({
            message: 'Error adding project to the database'
        })
    }
})

router.post('/:id/actions', async(req, res) => {
    const actionInfo = {...req.body, project_id: req.params.id}
    try {  
        const action = await actionDB.add(actionInfo)
        res.status(201).json(action)
    } catch (error) {
        res.status(500).json({
            message: 'Error adding action to the project'
        })
    }
})

module.exports = router