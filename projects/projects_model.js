const mappers = require('./mappers');

const db = require('../data/dbConfig.js')

module.exports = {
    find,
    add,
    update,
    remove
}

function find(id) {
    let data = db('projects')

    if (id) {
        data.where('projects.id', id).first();

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
    return db('projects')
        .insert(project)
        .then(([id]) => {find(id)})
}

function update(id, changes) {
    return db('projects')
        .where({ id })
        .update(changes)
        .then(() => {
            return db('projects')
                .where({ id })
                .first()
        })
}

function remove(id) {
    return db('projects')
        .where({ id })
        .del()
}

function getProjectActions(projectId) {
    return db('actions')
        .where('project_id', projectId)
        .then(actions => actions.map(action => mappers.actionToBody(action)));
}
