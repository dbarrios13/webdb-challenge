const knex = require('knex')

const mappers = require('./mappers');

const config = require('../knexfile')

const db = knex(config.development)

module.exports = {
    find,
    add
}

const data = 'actions'

function find(id) {
    if(id) {
        return db(data)
            .where('id', id)
            .first()
            .then(action => mappers.actionToBody(action))
    }

    return db(data).then(actions => {
        return actions.map(action => mappers.actionToBody(action))
    })
}

function add (action) {
    return db(data)
        .insert(action)
        .then(([id]) => find(id))
}