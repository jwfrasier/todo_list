// Declare constants and require for modules used
const express = require("express");
const app = express()
const mustache = require("mustache-express")
const expressValidator = require('express-validator')
const bodyParser = require("body-parser")
app.engine('mustache', mustache())
app.set('view engine', "mustache")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(expressValidator())
// Declare empty arrays to pass values to
let todos = []
let taskCompleted = []

//shows the form
app.get("/", function(req, res) {
  res.render('index', {
    todos: todos,
    taskCompleted: taskCompleted
  });
});
// submits info to the todo list
app.post("/", function(req, res) {
  todos.push(req.body.todo);
  res.redirect('/');
})
// Takes the todo task that are completed, removes them from the todo list
// then post it to the task completed form
app.post("/taskCompleted", function(req, res) {
  let remove = req.body.submitbutton
  todos.splice(todos.indexOf(remove), 1)
  taskCompleted.push(remove);
  res.redirect('/')

})

// listen to show that the node is running
app.listen(3000, function() {
  console.log("Running on 3000")
})
