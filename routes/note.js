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
.get((req, res) =>{
    if (req.query.userId) {
        const userId = Number(req.query.userId); 
        if (isNaN(userId)) return next(error(400, "Invalid userId format"))
        const userNotes = notes.filter((n) => n.userId == userId); 
        return res.json({userId: userId, n: userNotes})
    }
    // if (req.query.todoId){
    //     const todoId = Number(req.query.todoId); 
    //     if (isNaN(todoId)) return next(error(400, "Invalid todoId format"))

    //     const userNotes = notes.filter((n) => n.todoId == todoId); 
    //     return res.json({todoId: todoId, notes: userNotes})
    // }
    const links = [
        {
            href: "notes/:id",
            rel: ":id",
            type: "GET",
        }
    ];
    res.json({notes, links})
})

// remove todoId



.post((req, res, next) =>{
    if (req.body.userId && req.body.todoId && req.body.content){
        const note = {
            id: notes[notes.length - 1].id + 1,
            userId: req.body.userId,
            content: req.body.content
        }
        notes.push(note);
        res.json(notes[notes.length - 1]);
    } else next(error(400, "Incorrect Data"));
});




// http://localhost:3000/api/notes/?usid=1

router
.route("/:id")
.get((req, res, next) =>{
  if (req.params.userId) {
      const userId = Number(req.params.userId); 

    const notes = n.find((n) => n.id == req.params.id);
    return res.json({userId: userId, notes: userNotes})
  }
    const links = [
        {
            href: `/${req.params.id}`,
            rel: "",
            type: "PATCH",
        },
        {
            href: `${req.params.id}`,
            rel: "",
            type: "DELETE",
        },
    ];
    if (note) res.json({note, links});
    else next();
})
.patch((req, res, next) => {
    const note = notes.find((n, i) => {
        if (n.id == req.params.id) {
            for (const key in req.body){
                notes[i][key] = req.body[key];
            }
            return true;
        }
    });
    if (note) res.json(note);
    else next();
})
.delete((req, res, next) =>{
    const note = notes.find((n, i) => {
        if (n.id == req.params.id) {
            notes.splice(i, 1);
            return true;
        }
    });
    if (note) res.json(note); 
    else next();
});




// http://localhost:3000/api/users/1/notes

router
.route("/users/:id/notes")
.get((req, res, next) => {
if (req.query.userId) {
  const userId = Number(req.query.userId);
  const userNotes = comments.filter((n) => n.userId == userId); 
  res.json({userId: userId, notes: userNotes}); 

  if (isNaN(userId)) return next(error(400, "Invalid user ID"))
} 
const id = Number(req.params.id);
const userNotes = notes.filter((n) => n.id == id); 
res.json({id: id, notes: userNotes});
});



module.exports = router;