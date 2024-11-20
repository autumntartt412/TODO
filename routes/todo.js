const express = require("express");
const router = express.Router();

// IMPORT DATA
const users = require("../data/users");
const todos = require("../data/todos");
const notes = require("../data/notes");
const error = require("../utilities/error");


// http://localhost:3000/api/todos

router
.route("/")
.get((req, res) => {
res.render("todo", {
    todos
  }); 
}); 
  



// http://localhost:3000/api/todos/1


router
.route("/")
.get((req, res, next) => {
  if (req.query.userId) {
    const userId = Number(req.query.userId); 
    if (isNaN(userId)) return next(error(400, "Invalid userId format"))
  }
  if (req.query.todoId) {
    const todoId = Number(req.query.todoId); 
    if (isNaN(todoId)) return next(error(400, "Invalid todoId format"))
    
    const userTodos = todos.filter((t) => t.todoId == todoId); 
    return res.json({todoId: todoId, notes: userTodos})
}
  const links = [
    {
      href: "todos/:id",
      rel: ":id",
      type: "GET",
    },
  ];
  res.json({ todos, links });
  res.render("todo", {
    todos
  }); 
 
})
.post((req, res, next) => {
  if (req.body.userId && req.body.content) {
    const todo = {
      id: todos[todos.length - 1].id + 1,
      userId: req.body.userId,
      content: req.body.content,
    };
    todos.push(todo + `<form action="/note" method="post">
      <input type="text" name="content"/>
      <button type="submit">Send</button>
    </form>`);
    res.json(todos[todos.length - 1]) +1;
  } else next(error(400, "Incorrect Data"));
});



// http://localhost:3000/api/todos/?todoid=1

router
  .route("/:id")
  .get((req, res, next) => {
    if (req.params.userId) {
      const userId = Number(req.params.userId); 

    const userTodos = todos.find((t) => t.id == req.params.id);
    return res.json({userId: userId, todos: userTodos})
    }
    if (req.query.todoId){
      const todoId = Number(req.query.todoId); 
      if (isNaN(todoId)) return next(error(400, "Invalid todoId format"))

      const userNotes = notes.filter((n) => n.todoId == todoId); 
      return res.json({todoId: todoId, notes: userNotes})
  }
    const links = [
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "PATCH",
      },
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "DELETE",
      },
    ];
 
    if (todos) res.json({ todos, links });
    else next();

  })
  .patch((req, res, next) => {
    const todo = todos.find((t, i) => {
      if (t.id == req.params.id) {
        for (const key in req.body) {
          todos[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (todo) res.json(todo);
    else next();
  })
  .delete((req, res, next) => {
    const todo = todos.find((t, i) => {
      if (t.id == req.params.id) {
        todos.splice(i, 1);
        return true;
      }
    });

    if (todo) res.json(todo);
    else next();
  });


module.exports = router;



