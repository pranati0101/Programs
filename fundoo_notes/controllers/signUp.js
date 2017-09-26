// var flash    = require('connect-flash');

  exports.localSignUp = function(req, res,passport) {
    console.log("sign up locally");
        passport.authenticate('local-signup', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/newUserLocal', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
      });
    }
