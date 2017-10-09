'use strict';
module.exports = function(app) {
  var highscore = require('../controllers/highscoreController.js');

  // todoList Routes
  app.route('/highscores')
    .get(highscore.list_all_highscores)
    .post(highscore.create_a_highscore);

  app.route('/index.html')
    .get(highscore.main);

  app.route('/app.js')
    .get(highscore.scripts);

  app.route('/style.css')
    .get(highscore.styles);

  app.route('/highscores/:highscoreId')
    .get(highscore.read_a_highscore)
    .put(highscore.update_a_highscore)
    .delete(highscore.delete_a_highscore);

  app.route('/highest')
    .get(highscore.get_highest_score);
};
