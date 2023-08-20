const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/',(req, res) => res.render('home'));
router.get('/generic',(req, res) => res.render('generic'));
router.get('/faqs',(req, res) => res.render('faqs'));

module.exports = router;
