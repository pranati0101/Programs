exports.home = function(req, res) {
  res.render('login.pug',{ title : 'Home' });
  console.log("in home");
  // pug.renderFile('findex', merge(options, locals));
  }
  exports.signUp = function(req, res) {
    res.render('register.pug',{ title : 'sign-Up' });
    console.log("in register");
    // pug.renderFile('findex', merge(options, locals));
  }
  exports.forgotPassword = function(req, res) {
    res.render('forgotpassword.pug',{ title : 'Set Password' });
    console.log("setting Password");
    // pug.renderFile('findex', merge(options, locals));
    }
    exports.profile = function(req, res) {
      // res.render('forgotpassword.pug',{ title : 'Set Password' });
      console.log(" Profile");
      // pug.renderFile('findex', merge(options, locals));
      }
