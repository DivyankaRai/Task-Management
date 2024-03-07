const express = require('express')
const routes = express.Router()
const task = require('./controller/taskController')

routes.get("/tasks",task.getTasks)
routes.post("/tasks",task.postTask)
routes.delete("/tasks/:id",task.deleteTask)
routes.patch("/tasks/:id",task.updateTask)

module.exports = routes