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
.get((req, res, next) => {
res.json(users) 
  next();
})
.post((req, res, next) => {
 console.log(req.body)
  if (req.body.id && req.body.firstName && req.body.lastName && req.body.username && req.body.email) {
    const user = {
      id: users[users.length - 1].id + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email
    };
    console.log("user created from the body", user)
    console.log(users)
    todos.push(user)
    console.log('Added new user');
    console.log(users);
    res.json(user);
    // res.json(users[users.length - 1]) + 1;
  } else next(error(400, "Incorrect Data"))
  next();
});


// http://localhost:3000/api/users/?id=1

router
.route("/:id") 
.get((req, res, next) => {
    console.log(req.params)
      if (req.params.id) {
       const id = req.params.id;
        res.json(users.filter(u => u.id == Number(id))),
        next()
      }
     })
.put((req, res, next) => {
const id  = req.params.id;
const updateUser = req.body; 
const userIndex = users.filterIndex(u => u.id == Number(id));
  if (userIndex !== -1) {
    const user = users[userIndex]
  if (updateUser.firstName)
    user.firstName = updateUser.firstName;
  if (updateUser.lastName)
    user.lastName = updateUser.lastName;
  if (updateUser.username)
    user.email = updateUser.email;
  if (updateUser.username)
    user.email = updateUser.email;    
res.json(user);  
    } else {
      const error = new Error('user not found');
      error.status = 404;
      next(error);  
    }
  })
.delete((req, res, next) => {
    const userIndex = users.findIndex(u => u.id == req.params.id);
    console.log(req.params.id)
    if (userIndex !== -1) {
      const deletedUser = todos.splice(userIndex, 1);
      res.json(deletedUser[0]);  
    } else {
      const error = new Error('user not found');
      error.status = 404;
      next(error);  
    }
  });


module.exports = router;