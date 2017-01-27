var express = require('express');
var router = express.Router();


var Blog = require('../models/blog');

// dashboard
router.get('/blog',function(req,res){
  Blog.find(function(err, docs){
    res.json(docs);
  });
});

router.post('/blog', function(req, res){
  var post = req.body;
  var title= post.title;
  var body = post.body;

    var newPost = new Blog({
      title: title,
      body: body
    });

newPost.save(function (err) {
  if (err) {console.log ('Not working yet');}
  }).then(function(){res.end()});
});

router.delete('/blog/:id', function(req,res) {
Blog.remove({ _id: req.body.id }, function(err) {
    if (!err) {
          res.end();
    }
});
});


module.exports = router;
