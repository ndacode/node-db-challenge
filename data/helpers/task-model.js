const db = require("../db-config.js");
const mappers = require("./mappers");

module.exports = {
  find,
  insert,
  update,
  remove
};

function find(id) {
  let query = db("tasks");

  if (id) {
    return query
      .where("id", id)
      .first()
      .then(task => {
        if (task) {
          return mappers.taskToBody(task);
        } else {
          return null;
        }
      });
  } else {
    return query.then(tasks => {
      return tasks.map(task => mappers.taskToBody(task));
    });
  }
}

function insert(task) {
  return db("tasks")
    .insert(task)
    .then(([id]) => this.find(id));
}

function update(id, changes) {
  return db("task")
    .where("id", id)
    .update(changes)
    .then(count => (count > 0 ? this.find(id) : null));
}

function remove(id) {
  return db("tasks")
    .where("id", id)
    .del();
}
