const express = require("express"); 
const app = express();
const fs = require("fs");
const path = require('path'); 
const PORT = 3000;

// add/import routes 
const users = require("./routes/user");
const todos = require("./routes/todo");
const notes = require("./routes/note");
const pugRoutes = require('./routes/pug');
const error = require("./utilities/error");

//  Routes // add use of middlewear 
app.use("/api/users", users);
app.use("/api/todos", todos);
app.use("/api/notes", notes);
app.use('/', pugRoutes);


// Body parser middleware
// app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());




// Set Pug as the view engine
app.set('view engine', 'pug');
app.set("views", "./views");
// app.set('views', path.join(__dirname, 'views'));


// Middleware to serve static files in public folder
app.use(express.static('public')); 
app.use('/img', express.static(path.join(__dirname, "public/img"))); 
// app.use(express.static(path.join(__dirname, 'public')));







// 404 Middleware
app.use((req, res, next) => {
    next(error(404, "Resource Not Found"));
  });


  // Error-handling middleware.
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
  });

 
 // PORT
  app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON http://localhost:${PORT}`);
  }); 