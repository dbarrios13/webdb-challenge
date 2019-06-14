const knex = require('knex')

const config = require('../knexfile')
const mappers = require('./mappers');


const db = knex(config.development)

module.exports = {
    find,
    add,
    update,
    remove
}

const data = db('projects')

function find(id) {
    data.where('projects.id', id).first();

    if (id) {
        const promises = [data, getProjectActions(id)];

        return Promise.all(promises).then(function (results) {
            let [project, actions] = results;

            if (project) {
                project.actions = actions;

                return mappers.projectToBody(project);
            } else {
                return null;
            }
        });
    }

    return data.then(projects => {
        return projects.map(project => mappers.projectToBody(project));
    });
}

function add(project) {
    return data
        .insert(project)
        .then(ids => {
            const [id] = ids
            return find(id)
        })
}

function update(id, changes) {
    return data
        .where({ id })
        .update(changes)
        .then(() => {
            return db(data)
                .where({ id })
                .first()
        })
}

function remove(id) {
    return data
        .where({ id })
        .del()
}

function getProjectActions(projectId) {
    return db('actions')
        .where('project_id', projectId)
        .then(actions => actions.map(action => mappers.actionToBody(action)));
}
