const db = require("../db-config.js");
const mappers = require("./mappers");

module.exports = {
  find,
  insert,
  update,
  remove,
  findProjectTasks,
  findProjectResources
};

function find(id) {
  let query = db("projects as p");

  if (id) {
    query.where("p.id", id).first();

    const promises = [
      query,
      this.findProjectTasks(id),
      this.findProjectResources(id)
    ];

    return Promise.all(promises).then(function(results) {
      let [project, tasks] = results;

      if (project) {
        // project.tasks = tasks;
        // project.resources = resources;

        return (
          mappers.projectToBody(project),
          mappers.taskToBody(project),
          mappers.resourceToBody(project)
        );
      } else {
        return null;
      }
    });
  } else {
    return query.then(projects => {
      return projects.map(project => mappers.projectToBody(project));
    });
  }
}

function insert(project) {
  return db("projects")
    .insert(project, "id")
    .then(([id]) => this.find(id));
}

function update(id, changes) {
  return db("projects")
    .where("id", id)
    .update(changes)
    .then(count => (count > 0 ? this.find(id) : null));
}

function remove(id) {
  return db("projects")
    .where("id", id)
    .del();
}

function findProjectTasks(projectId) {
  return db("tasks")
    .join("projects", "projects.id", "project_id")
    .select("tasks.*", "name as n")
    .where("project_id", projectId)
    .then(tasks => tasks.map(tasks => mappers.taskToBody(tasks)));
}

function findProjectResources(projectId) {
  console.log(projectId);
  return db("resources")
    .where("project_id", projectId)
    .then(resources =>
      resources.map(resources => mappers.resourceToBody(resources))
    );
}
