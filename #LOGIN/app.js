const express = require('express');
// const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
// const ExpressError = require('../utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const flash = require('connect-flash');
// const catchAsync = require('../utils/catchAsync');
const session = require('express-session');
const path = require('path');

const app = express();

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


// app.use(expressLayouts); //order imp 
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))


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

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes

app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

//added
app.all('*', (req, res, next) => { 
    res.send("Page not found");
    next(new ExpressError('Page Not Found', 404))
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));



// ayaan


// const express = require('express');
// const path = require('path');
// const mongoose = require('mongoose');
// const ejsMate = require('ejs-mate');
// const session = require('express-session');
// const flash = require('connect-flash');
// const ExpressError = require('../utils/ExpressError');
// const methodOverride = require('method-override');
// const passport = require('passport');
// const LocalStrategy = require('passport-local');
// const catchAsync = require('../utils/catchAsync');
// const User = require('./models/user');
// // const expressLayouts = require('express-ejs-layouts');
// // require('./config/passport')(passport);

// mongoose.set("strictQuery", true);
// mongoose.connect('mongodb://127.0.0.1:27017/mypharmacy', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//     console.log("Database connected");
// });

// const app = express();

// // app.use(expressLayouts);
// app.engine('ejs', ejsMate)
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'))
// app.use(express.urlencoded({ extended: true })); //to get data from form with req.body
// app.use(methodOverride('_method'));
// app.use(express.static(path.join(__dirname, 'public')))

// const sessionConfig = {
//     secret: 'thisshouldbeabettersecret!',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         httpOnly: true,
//         expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//         maxAge: 1000 * 60 * 60 * 24 * 7
//     }
// }

// app.use(session(sessionConfig))
// app.use(flash());

// app.use(passport.initialize());
// app.use(passport.session());

// // passport.use(new LocalStrategy(User.authenticate()));

// // passport.serializeUser(User.serializeUser());
// // passport.deserializeUser(User.deserializeUser());

// app.use((req, res, next) => {
//     console.log(req.session)
//     res.locals.currentUser = req.user;
//     res.locals.success = req.flash('success');
//     res.locals.error = req.flash('error');
//     next();
// })

// app.get('/', (req, res) => {
//     res.render('home');
// })

// app.get('/login', (req, res) => {
//     res.render('users/login');
// })

// app.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
//     req.flash('success', 'welcome back!');
//     const redirectUrl = req.session.returnTo || '/login';
//     delete req.session.returnTo;
//     res.redirect(redirectUrl);
//     res.send(req.body)
// })

// app.get('/register', (req, res) => {
//     res.render('users/register');
// })

// app.post('/register', catchAsync(async (req, res, next) => {
//     try {
//         const {fullname, email, username, password } = req.body;
//         const user = new User({fullname, email, username });
//         const registeredUser = await User.register(user, password);
//         req.login(registeredUser, err => {
//             if (err) return next(err);
//             req.flash('success', 'Welcome!');
//             res.redirect('/');
//         })
//     } catch (e) {
//         req.flash('error', e.message);
//         res.redirect('register');
//     }
// }));

// // app.get('/logout', (req, res) => {
// //     req.logout();
// //     req.flash('success', "Goodbye!");
// //     // res.redirect('/campgrounds');
// // })

// app.all('*', (req, res, next) => {
//     res.send("Page not found");
//     next(new ExpressError('Page Not Found', 404))
// })

// app.use((err, req, res, next) => {
//     const { statusCode = 500 } = err;
//     if (!err.message) err.message = 'Oh No, Something Went Wrong!'
//     res.status(statusCode).render('error', { err })
// })

// app.listen(3000, () => {
//     console.log('Serving on port 3000')
// })