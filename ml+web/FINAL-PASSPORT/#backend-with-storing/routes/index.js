const express = require('express');
const router = express.Router();


// const bcrypt = require('bcryptjs');
// const passport = require('passport');

// // Load User model

// const User = require('../models/User');
// const { db } = require('../models/User');
// const { forwardAuthenticated } = require('../config/auth');


const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
// router.get('/', (req, res) => res.render('welcome'));
router.get('/', forwardAuthenticated, (req, res) => res.render('home'));

// Dashboard

router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

// Home Page

// router.get('/register', (req, res) => res.render('register'));
router.get('/home', forwardAuthenticated, (req, res) => res.render('home'));

// router.get('/dashboard', (req, res) => res.render('dashboard'));

module.exports = router;
