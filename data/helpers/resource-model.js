const db = require("../db-config.js");
const mappers = require("./mappers");

module.exports = {
  find,
  insert,
  update,
  remove
};

function find(id) {
  let query = db("resources");

  if (id) {
    return query
      .where("id", id)
      .first()
      .then(resource => {
        if (resource) {
          return mappers.resourceToBody(resource);
        } else {
          return null;
        }
      });
  } else {
    return query.then(resource => {
      return resources.map(resource => mappers.resourceToBody(resource));
    });
  }
}

function insert(resource) {
  return db("resources")
    .insert(resource)
    .then(([id]) => this.find(id));
}

function update(id, changes) {
  return db("resources")
    .where("id", id)
    .update(changes)
    .then(count => (count > 0 ? this.find(id) : null));
}

function remove(id) {
  return db("resources")
    .where("id", id)
    .del();
}
