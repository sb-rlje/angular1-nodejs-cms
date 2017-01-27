var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');


//courses
router.get('/register',function(req,res){
  User.find(function(err, docs){
    res.json(docs);
  });
});

// Register User
router.post('/register', function(req, res){
  var athlete = req.body;
  var username = athlete.username;
  var password = athlete.password;

    var newUser = new User({
      username: username,
      password: password
    });

    User.createUser(newUser, function(err, success){
      if (success){res.send({ redirect:"/test"});};
    });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
    if(err) throw err;
    if(!user){
      return done(null, false);
    }

    User.comparePassword(password, user.password, function(err, success){
      if(success){
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.send({ redirect:"/test"});
  });


module.exports = router;
