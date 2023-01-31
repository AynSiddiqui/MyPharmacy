const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
const axios = require('axios')
const app = express();
const url=require('url');
var myScripts = require('./static/rdisp.js');
// Passport Config
require('./config/passport')(passport);

// DB Config

// const db = require('./config/keys').mongoURI; 

// Connect to MongoDB

// mongoose
//   .connect(
//     db,
//     { useNewUrlParser: true ,useUnifiedTopology: true}
//   )
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

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
// app.use(express.static(__dirname + '/public'));
// app.use( express.static( "public" ) );

// Express body parser

// app.use(express.urlencoded({ extended: false })); //to get data from form with req.body
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

// Global variables

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes

// app.use('/', require('./routes/index.js'));
// app.use('/', require('./routes/users.js'));
app.get('/search', (req, res) => res.render("../templates/index"))
app.post('/searchm', async (req, res) => {
  try {
    const response = await fetch('http://192.168.29.220:5001/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });
    // const response = await axios.post('http://localhost:5001/search', { data:req.body });
    const json = await response.json();

    res.redirect(url.format({
      pathname: "/searchm",
      query:json
    }));
  } catch (error) {
    console.error(error);
  }
});
app.get('/searchm', async (req, res) => {
  const { len, med, id, condition, rating } = req.query;
  res.render('../templates/index1',{
    len,med, id, condition, rating })
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));