const express = require("express");
const router = express.Router();



// IMPORT DATA
const users = require("../data/users");
const todos = require("../data/todos");
const notes = require("../data/notes");
const error = require("../utilities/error");


// http://localhost:3000/api/notes/1

router
.route("/")
.get((req, res, next) =>{
    res.json(todos)
  res.render("note", {
    todos
  }); 
  next();
})
.post((req, res, next) => {
    console.log(req.body)
     if (req.body.userId && req.body.content) {
       const note = {
         id: notes[notes.length - 1].id + 1,
         userId: req.body.userId,
         content: req.body.content
       };
       console.log("note created from the body", note)
       console.log(notes)
       todos.push(note)
       console.log('Added new note');
       console.log(notes);
       res.json(notes[notes.length - 1]) + 1;
     } else next(error(400, "Incorrect Data"))
     next();
   });


// http://localhost:3000/api/notes/?userId=1

router
.route("/:userId") 
.get((req, res, next) => {
 console.log(req.params)
   if (req.params.userId) {
    const userId = req.params.userId;
     res.json(notes.filter(n => n.userId == Number(userId))),
     next()
   }
  })
.put((req, res, next) => {
const userId  = req.params.userId;
const updateNote = req.body; 
const noteIndex = notes.findIndex(t => n.userId == userId && n.content == updateNote);
  if (noteIndex !== -1) {
    const note = notes[noteIndex]
  if (updateNote.content) {
    note.content = updateNote.content;
  }   
res.json(note);  
    } else {
      const error = new Error('note not found');
      error.status = 404;
      next(error);  
    }
  })
.delete((req, res, next) => {
    const noteIndex = notes.findIndex(n => n.id == req.params.userId);
    console.log(req.params.userId)
    if (noteIndex !== -1) {
      const deletedNote = notes.splice(noteIndex, 1);
      res.json(deletedNote[0]);  
    } else {
      const error = new Error('note not found');
      error.status = 404;
      next(error);  
    }
  });



module.exports = router;