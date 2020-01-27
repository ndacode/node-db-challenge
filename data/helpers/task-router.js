const express = require("express");
const Projects = require("./project-model");
const Tasks = require("./task-model");
const taskRouter = express.Router();

// ... ADD TASK ...
taskRouter.post("/:id", (req, res) => {
  const { description, notes } = req.body;
  const project_id = Number(req.params.id);
  if (!req.params.id) {
    res.status(404).json({
      errorMessage: "The project with the specified ID does not exist."
    });
  }
  if (!req.body.description) {
    res.status(400).json({
      errorMessage: "Please provide description for the task."
    });
  }

  Tasks.insert({ project_id, description, notes })
    .then(tasks => {
      res.status(201).json(tasks);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the task to the database."
      });
    });
});

// ... DELETE TASK ...
taskRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  Projects.findProjectTasks(req.params.id).then(tasks => {
    if (!tasks[0]) {
      res.status(404).json({
        message: "The task with the specified ID does not exist."
      });
    }
    Tasks.remove(req.params.id)
      .then(tasks => {
        res.status(200).json(tasks);
      })
      .catch(err => {
        res.status(500).json({
          error: "The task could not be removed."
        });
      });
  });
});

// ... UPDATE TASK ...

taskRouter.put("/:id", (req, res) => {
  const { description, notes } = req.body;
  const id = req.params.id;

  if (!id) {
    res.status(404).json({
      message: "The project with the specified ID does not exist."
    });
  }
  if (!description || !notes) {
    res.status(400).json({
      errorMessage: "Please provide description and notes for the task."
    });
  }
  Tasks.update(req.params.id, req.body)
    .then(task => {
      res.status(200).json(task);
    })
    .catch(err => {
      res.status(500).json({
        error: "The task information could not be modified."
      });
    });
});

module.exports = taskRouter;
