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

// Search Routes
app.get('/search', (req, res) => res.render("../templates/index"))
app.post('/searchm', async (req, res) => {
  try {
    const response = await fetch('http://127.0.0.2:5001/search', {//change dns to your local dns on app.py terminal if required
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });
    const json = await response.json();
    res.redirect(url.format({
      pathname: "/searchm",
      query: json
    }));
  } catch (error) {
    console.error(error);
  }
});
app.get('/searchm', async (req, res) => {
  const { cost, len, med, id, condition, rating } = req.query;
  res.render('../templates/index1', {
    cost, len, med, id, condition, rating, request: req
  })
});

app.post('/searchgen', async (req, res) => {
  try {
    const response = await fetch('http://127.0.0.2:5001/searchgen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });
    const json = await response.json();
    res.redirect(url.format({
      pathname: "/searchgen",
      query: json
    }));
  } catch (error) {
    console.error(error);
  }
});
app.get('/searchgen', async (req, res) => {
  const { cost, len, med, id, condition, rating, side } = req.query;
  res.render('../templates/index2', {
    cost, len, med, id, condition, rating, side, request: req
  })
});


app.get('/searchs', (req, res) => res.render("../templates/index3"))

app.post('/searchstore', async (req, res) => {
  try {
    const response = await fetch('http://127.0.0.2:5001/displaystore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });
    const json = await response.json();
    if (json["len"] > 50) {
      res.render("../templates/search_error")    }
    else {
      res.redirect(url.format({
        pathname: "/searchstore",
        query: json
      }));
    }
  } catch (error) {
    console.error(error);
  }
});

app.get('/searchstore', async (req, res) => {
  const {len,name,addr,pin,phone,hours}=req.query
  res.render("../templates/index4",{len,name,addr,pin,phone,hours})
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));