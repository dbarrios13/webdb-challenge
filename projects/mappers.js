module.exports = {
  projectToBody,
  actionToBody,
};

function projectToBody(project) {
  const result = {
    ...project,
    completed: intToBoolean(project.completed),
  };

  if (project.actions) {
    result.actions = project.actions.map(action => ({
      ...action,
      completed: intToBoolean(action.completed),
    }));
  }

  return result;
}

function actionToBody(action) {
  return {
    ...action,
    completed: intToBoolean(action.completed),
  };
}
