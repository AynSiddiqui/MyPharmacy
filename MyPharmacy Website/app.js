const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
const app = express();
const url = require('url');
const { castObject } = require('./models/User.js');
require('./config/passport')(passport);


mongoose.set("strictQuery", true);
mongoose.connect('mongodb://127.0.0.1:27017/testsignup', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});


// EJS
app.use(expressLayouts); //order imp
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))

// Express body parser
app.use(express.urlencoded({ extended: true })); //to get data from form with req.body

// Express session middleware
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash middleware
app.use(flash());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', require('./routes/index.js'));
app.use('/', require('./routes/users.js'));
app.use('/', require('./routes/search.js'));

// Search Routes



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));