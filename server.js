const express = require("express");

const router = require("./data/helpers/project-router.js");
const resourceRouter = require("./data/helpers/resource-router.js");
const taskRouter = require("./data/helpers/task-router.js");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("<h1>Greetings<h1>");
});
server.use("/api/projects", router);
server.use("/api/resources", resourceRouter);
server.use("/api/tasks", taskRouter);

module.exports = server;
