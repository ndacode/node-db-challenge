const express = require("express");
const Projects = require("./project-model");
const Resources = require("./resource-model");
const resourceRouter = express.Router();

// ... VALIDATE ADD RESOURCE REQUEST ...
resourceRouter.post("/:id", (req, res) => {
  const { description, name } = req.body;
  const project_id = Number(req.params.id);
  if (!req.params.id) {
    res.status(404).json({
      errorMessage: "The project with the specified ID does not exist."
    });
  }
  if (!req.body.name) {
    res.status(400).json({
      errorMessage: "Please provide name for the resource."
    });
  }
  // ... ADD RESOURCE ...
  Resources.insert({ project_id, description, name })
    .then(resource => {
      res.status(201).json(resource);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the resource to the database."
      });
    });
});

// ... DELETE RESOURCE ...
resourceRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  Projects.findProjectResources(req.params.id).then(resources => {
    if (!resources[0]) {
      res.status(404).json({
        message: "The resource with the specified ID does not exist."
      });
    }
    Resources.remove(req.params.id)
      .then(resources => {
        res.status(200).json(resources);
      })
      .catch(err => {
        res.status(500).json({
          error: "The resource could not be removed."
        });
      });
  });
});

// ... VALIDATE RESOURCE REQUEST ...

resourceRouter.put("/:id", (req, res) => {
  const { description, name } = req.body;
  const id = req.params.id;

  if (!id) {
    res.status(404).json({
      message: "The project with the specified ID does not exist."
    });
  }
  if (!name) {
    res.status(400).json({
      errorMessage: "Please provide a name for the resource."
    });
  }

  // ... UPDATE RESOURCE ...
  Resources.update(req.params.id, req.body)
    .then(task => {
      res.status(200).json(resource);
    })
    .catch(err => {
      res.status(500).json({
        error: "The resource information could not be modified."
      });
    });
});

module.exports = resourceRouter;
