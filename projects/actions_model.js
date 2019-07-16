const mappers = require('./mappers');

const db = require('../data/dbConfig.js')

module.exports = {
    find,
    add
}

function find(id) {
    if(id) {
        return db('actions')
            .where('id', id)
            .first()
            .then(action => mappers.actionToBody(action))
    }

    return db('actions').then(actions => {
        return actions.map(action => mappers.actionToBody(action))
    })
}

function add (action) {
    return db('actions')
        .insert(action)
        .then(([id]) => this.find(id))
}