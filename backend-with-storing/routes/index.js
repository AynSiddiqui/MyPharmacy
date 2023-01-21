const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
// router.get('/', (req, res) => res.render('welcome'));
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

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
