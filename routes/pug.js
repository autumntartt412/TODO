const express = require('express');
const router = express.Router();

// IMPORT DATA
const users = require("../data/users");
const todos = require("../data/todos");
const notes = require("../data/notes");
const error = require("../utilities/error");








// Home pug route
router.get('/', (req, res) => {
  res.render('index', { title: 'Home', message: 'WELCOME' });
});



// Home pug route


router.get("/", (req, res) => {
  const imgUrl = '/public/img/ToDo.jpg'; 
  res.render('index', {imgUrl}); 
});

// router.get("/download", (req, res) => {
//   res.download("./public/img/ToDo.jpg"); 
// }); 




// Todo pug route
router.get('/todo', (req, res) => {
  res.render('todo', { title: 'To Do\'s', message: 'PLEASE MAKE A TO DO LIST!' });
});



// Index pug route
router.get('/form', (req, res) => {
  res.render('form', { title: 'Index', message: 'Please Log In:' });
});



// Note pug route
router.get('/note', (req, res) => {
  res.render('note', { title: 'Note', message: 'Add a Note:' });
});



router.post('/', (req, res) => {
  const { name, username, email } = req.body;
  res.render('/', {
    title: 'Form Submitted',
    message: `Thanks for submitting the form, ${name}!`,
    name,
    username,
    email,
  });
});

router.post('/todo', (req, res) => {
  const { todo } = req.body;
  res.render('todo', {
    title: 'To Do Submitted',
    message: `To Do Task Added, ${todo}!`,
    todo,
  });
});

router.post('/note', (req, res) => {
  const { name, note  } = req.body;
  res.render('note', {
    title: 'Note Submitted',
    message: `Thanks for adding notes, ${name}: ${note}!`,
    note,
  });
});



module.exports = router;