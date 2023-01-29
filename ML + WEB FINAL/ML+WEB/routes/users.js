const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Load User model

const User = require('../models/User');
const { db } = require('../models/User');
const { forwardAuthenticated, notin } = require('../config/auth');

// // Home Page

// // router.get('/register', (req, res) => res.render('register'));
// router.get('/home', forwardAuthenticated, (req, res) => res.render('home'));

// Login Page

// router.get('/login',  (req, res) => res.render('login'));
router.get('/login', notin, (req, res) => res.render('login'));

// Register Page

// router.get('/register', (req, res) => res.render('register'));
router.get('/register', notin, (req, res) => res.render('register'));





// Register

// router.post('/register', (req, res) => {
//   console.log(req.body)
//   res.send('hello');
// });

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email })
    .then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        // console.log(newUser)
        // db.collection('users').insertOne(newUser)
        // console.log(User)
        // res.send('hello');

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );

                res.redirect('/login'); 
                // res.send('hello')
              })
              .catch(err => console.log(err));
          });
        });

        // console.log(newUser)

      }
    });
  }
});

// Login handle

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    // successRedirect: '/dashboard',//trying home
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

// Logout

router.get('/logout', (req, res) => {
    //   req.logout();
    req.logout(function(err) {
    if (err) { return next(err); }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
    // res.redirect('/login'); //trying home
  });
});



module.exports = router;
