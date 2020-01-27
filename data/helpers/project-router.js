const express = require("express");

const Projects = require("./project-model");
const Resources = require("./resource-model");
const Tasks = require("./task-model");
const router = express.Router();

// ... GET PROJECTS ...
router.get("/", (req, res) => {
  console.log(req);
  Projects.find()
    .then(projects => {
      console.log(projects.tasks);
      console.log(projects.resources);
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The project information could not be retrieved."
      });
    });
});

// ... GET PROJECT TASKS ...
router.get("/:id/tasks", (req, res) => {
  Projects.findProjectTasks(req.params.id).then(tasks => {
    if (!tasks[0]) {
      res.status(404).json({
        message: "The project with the specified ID does not exist."
      });
    } else if (tasks) {
      console.log(tasks);
      res.status(200).json(tasks);
    } else
      res.status(500).json({
        error: "The tasks information could not be retrieved."
      });
  });
});

// ... GET PROJECT RESOURCES ...
router.get("/:id/resources", (req, res) => {
  Projects.findProjectResources(req.params.id).then(resources => {
    if (!resources[0]) {
      res.status(404).json({
        message: "The project with the specified ID does not exist."
      });
    } else if (resources) {
      res.status(200).json(resources);
    } else
      res.status(500).json({
        error: "The resource information could not be retrieved."
      });
  });
});

// ... ADD PROJECT ...
router.post("/", (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    res.status(400).json({
      errorMessage: "Please provide name and description for the project."
    });
  }
  Projects.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the project to the database."
      });
    });
});

// ... DELETE PROJECT ...

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Projects.find(req.params.id).then(project => {
    if (!project) {
      res.status(404).json({
        message: "The project with the specific ID does not exist."
      });
    }
    Projects.remove(req.params.id)
      .then(project => {
        res.status(200).json(project);
      })
      .catch(err => {
        res.status(500).json({
          error: "The project could not be removed."
        });
      });
  });
});

// ... UPDATE PROJECT  ...

router.put("/:id", (req, res) => {
  const { name, description } = req.body;
  const id = req.params.id;
  Projects.find(req.params.id).then(project => {
    if (!project) {
      res.status(404).json({
        message: "The project with the specific ID does not exist."
      });
    } else if (!project.name || !project.description) {
      res.status(400).json({
        errorMessage: "Please provide name and description for the project."
      });
    }
    Projects.update(req.params.id, req.body)
      .then(project => {
        res.status(200).json(project);
      })
      .catch(err => {
        res.status(500).json({
          error: "The project information could not be modified."
        });
      });
  });
});

module.exports = router;
