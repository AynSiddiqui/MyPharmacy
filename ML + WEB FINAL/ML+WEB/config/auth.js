module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/login');
  },
    notin :function(req, res, next){
      if (!req.isAuthenticated()) {
        return next();
      }
      // req.flash('error_msg', 'Already Logged in');
      res.redirect('/');
    },
  forwardAuthenticated : function(req, res, next) {
      if (req.isAuthenticated()) {
        res.redirect('/');
      } else {
        res.redirect('/login');
      }
}
};
