const express = require("express");
const router = express.Router();

// IMPORT DATA
const users = require("../data/users");
const todos = require("../data/todos");
const notes = require("../data/notes");
const error = require("../utilities/error");





// http://localhost:3000/api/users/1

router
  .route("/")

    .get((req, res) => {
    const links = [
      {
        href: "users/:id",
        rel: ":id",
        type: "GET",
      }
    ];
    res.json({ users, links });
  })
  .post((req, res, next) => {
    if (req.body.name && req.body.username && req.body.email) {
      if (users.find((u) => u.username == req.body.username)) {
        next(error(409, "Username Already Taken"));
      }
      const user = {
        id: users[users.length - 1].id + 1,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };

      users.push(user);
      res.json(users[users.length - 1]);
    } else next(error(400, "Incorrect Data"));
  });



// http://localhost:3000/api/users/?todoid=1

router
  .route("/:id/todo")
  .get((req, res, next) => {
  const userId = Number(req.params.id); 

  const user = users.find((u) => u.id == userId);
  if (!user) return next(error(404, "user not found"))
  
  const userTodos = todos.filter((t) => t.userId == userId);
  res.json({
    user: {id: user.id, name: user.name, username: user.username},
    todos: userTodos
  })
})



http://localhost:3000/api/users/1

router
  .route("/:id")
  .get((req, res, next) => {
    if (req.query.userId) {
      const userId = Number(req.query.userId); 
      if (isNaN(userId)) return next(error(400, "Invalid userId format"))
    }
    const user = users.find((u) => u.id == req.params.id);

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

    if (user) res.json({ user, links });
    else next();
  })
  .patch((req, res, next) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          users[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  })
  .delete((req, res, next) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        users.splice(i, 1);
        return true;
      }
    });

    if (user) res.json(user);
    else next();
  });




 
  // http://localhost:3000/api/users/1/notes


router
  .route("/:id/notes")
  .get((req, res, next) => {
    if (req.query.todoId){
      const todoId = Number(req.query.todoId); 
      const userNotes = notes.filter((n) => n.todoId == todoId); 
      res.json({todoId: todoId, notes: userNotes}); 

      if (isNaN(todoId)) return next(error(400, "Invalid todo ID"))
    } 
    const id = Number(req.params.id); 
    const userNotes = notes.filter((n) => n.id == id); 
    res.json({id: id, notes: userNotes});
  }); 





 

module.exports = router;