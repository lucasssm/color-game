'use strict';
let http = require('http'),
    fs = require('fs');

var mongoose = require('mongoose'),
  Highscore = mongoose.model('Highscores');


exports.main = function(req, res){
    fs.readFile('./index.html', 'utf-8', function (err, html) {
      if (err) {
          throw err;
      }
    res.writeHeader(200, {"Content-Type": "text/html"});
    res.write(html);
    res.end();
  });
}

exports.scripts = function(req, res){
    fs.readFile('./app.js', 'utf-8', function (err, html) {
      if (err) {
          throw err;
      }
    res.writeHeader(200, {"Content-Type": "text/javascript"});
    res.write(html);
    res.end();
  });
}

exports.styles = function(req, res){
    fs.readFile('./style.css', 'utf-8', function (err, html) {
      if (err) {
          throw err;
      }
    res.writeHeader(200, {"Content-Type": "text/css"});
    res.write(html);
    res.end();
  });
}

exports.list_all_highscores = function(req, res) {
  Highscore.find({}, function(err, highscore) {
    if (err)
      res.send(err);
    res.json(highscore);
  });
};
exports.get_highest_score = function(req, res) {
  Highscore.find({}, function(err, highscore) {
    if (err){
      res.send(err);
    }
    let highest = highscore[0]
    for(let i=1; i < highscore.length; i++){
      if(highscore[i].score > highest.score){
        highest = highscore[i];
      }
    }
    res.json(highest);
  });
};


exports.create_a_highscore = function(req, res) {
  var new_highscore = new Highscore(req.body);
  new_highscore.save(function(err, highscore) {
    if (err)
      res.send(err);
    res.json(highscore);
  });
};


exports.read_a_highscore = function(req, res) {
  Highscore.findById(req.params.highscoreId, function(err, highscore) {
    if (err)
      res.send(err);
    res.json(highscore);
  });
};


exports.update_a_highscore = function(req, res) {
  Highscore.findOneAndUpdate({_id: req.params.highscoreId}, req.body, {new: true}, function(err, highscore) {
    if (err)
      res.send(err);
    res.json(highscore);
  });
};


exports.delete_a_highscore = function(req, res) {
  Highscore.remove({
    _id: req.params.highscoreId
  }, function(err, highscore) {
    if (err)
      res.send(err);
    res.json({ message: 'highscore successfully deleted' });
  });
};
