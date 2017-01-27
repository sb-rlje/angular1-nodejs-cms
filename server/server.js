var express = require('express');
var session = require('express-session');
var expressValidator = require('express-validator');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose');
mongoose.connect('');
mongoose.Promise = global.Promise;

var api_routes= require('./routes/api');
var user_routes= require('./routes/users');

//init app
var app = express();

// view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// static folder
app.use(express.static(path.join(__dirname, '../client')));

//body parser
app.use(bodyParser.json());

//sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


//passport
app.use(passport.initialize());
app.use(passport.session());

//express validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;
 
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


// routes
app.use('/api', api_routes);
app.use('/users', user_routes);


app.listen(3000, function(){
  console.log('Express server listening on port 3000');
});

app.use 