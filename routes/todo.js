const express = require("express");
const router = express.Router();



// IMPORT DATA
const users = require("../data/users");
const todos = require("../data/todos");
const notes = require("../data/notes");
const error = require("../utilities/error");


// http://localhost:3000/api/todos

// router
// .route("/")
// .get((req, res) => {
// res.render("todo", {
//     todos
//   }); 
// }); 
  



// http://localhost:3000/api/todos/1

router
.route("/")
.get((req, res, next) => {
 res.json(todos)
  res.render("todo", {
    todos
  }); 
  next();
})
.post((req, res, next) => {
 console.log(req.body)
  if (req.body.userId && req.body.content) {
    const todo = {
      id: todos[todos.length - 1].id + 1,
      userId: req.body.userId,
      content: req.body.content
    };
    console.log("todo created from the body", todo)
    console.log(todos)
    // todos.push(todo)
    todos.push(todo + `<form action="/note" method="post">
      <input type="text" name="content"/>
       <button type="submit">Send</button>
      </form>`);
    console.log('Added new todo');
    console.log(todos);
  
    res.json(todos[todos.length - 1]) + 1;
  } else next(error(400, "Incorrect Data"))
  next();
});


// http://localhost:3000/api/todos/?userId=1

router
.route("/:userId") 
.get((req, res, next) => {
 console.log(req.params)
   if (req.params.userId) {
    const userId = req.params.userId;
     res.json(todos.filter(t => t.userId == Number(userId))),
     next()
   }
  })
.put((req, res, next) => {
const userId  = req.params.userId;
const updateTodo = req.body; 
const todoIndex = todos.findIndex(t => t.userId == userId && t.content == updateTodo);
  if (todoIndex !== -1) {
    const todo = todos[todoIndex]
  if (updateTodo.content) {
    todo.content = updateTodo.content;
  }   
res.json(todo);  
    } else {
      const error = new Error('todo not found');
      error.status = 404;
      next(error);  
    }
  })
.delete((req, res, next) => {
    const todoIndex = todos.findIndex(t => t.id == req.params.userId);
    console.log(req.params.userId)
    if (todoIndex !== -1) {
      const deletedTodo = todos.splice(todoIndex, 1);
      res.json(deletedTodo[0]);  
    } else {
      const error = new Error('todo not found');
      error.status = 404;
      next(error);  
    }
  });


module.exports = router;