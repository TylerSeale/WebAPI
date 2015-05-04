// Tyler Seale
// homework4

var usergrid = require('usergrid');
var express = require('express');
var bodyParser = require('body-parser')

// Connect to Apigee
var currentUser = new usergrid.client({
  orgName: 'tseale',
  appName: 'sandbox',
  logging: true
});

// Required
var app = express();
var router = express.Router();
app.use(bodyParser.json());

// keys for movie
var movieKeys = ['title', 'year', 'actors'];

// checks for validity of each key
function isValidMovie(movie) {
  for (var i = 0; i < movieKeys.length; i++) {
    if (!(movieKeys[i] in movie)) {
      console.log("movie missing key " + movieKeys[i]);
      return false;
    }
  };

  // actors must be an array
  if (!Array.isArray(movie.actors)) {
    console.log("movie.actors is not array");
    return false;
  }

  // actors must have content
  if (movie.actors.length < 1) {
    console.log("movie.actors is empty");
    return false;
  }

  // valid
  return true;
}

// router
router.use(function(req, res, next) {
  next();
});

// router allows easier coding, chaining commands instead of sepatating out commands
// /movies
router.route('/movies')
  // /movies get
  // gets all movies
  .get(function(req, res) {
    currentUser.createCollection({type:'movies'}, function (err, movies) {
      if (err) {

      }
      else {
        var returnedMovies = [];
        while(movies.hasNextEntity()) {
          returnedMovies.push(movies.getNextEntity().get());
        }
        
        res.status(200).json(returnedMovies);
        res.end();
      }
    });
  })
  // /movies post
  // creates a new movie
  .post(function(req, res) {
    currentUser.createEntity({type:'movies'}, function (err, movie) {
      if (err) {

      }
      else {
        if (isValidMovie(req.body)) {
          movie.set(req.body);
          movie.save(function(err){
            if (err) {

            }
            else {
              res.json(movie.get());
              res.end();
            }
          });
        }
        else {
          res.status(400).json({error: 'invalid movie object'});
          res.end();
        }
      }
    });
  });

// /movies/id
router.route('/movies/:id')
  // /movies/id get
  // gets the movie with the specified id
  .get(function(req, res) {
    var options = {type: 'movies', uuid: req.params.id};
    currentUser.createEntity(options, function (err, movie) {
      if (err) {
        res.status(404).json({error: 'movie not found'});
        res.end();
      }
      else {
        res.status(200).json(movie.get());
        res.end();
      }
    });
  })
  // /movies/id delete
  // delete the movie with specified id
  .delete(function(req, res) {
    var options = {type: 'movies', uuid: req.params.id};
    currentUser.createEntity(options, function (err, movie) {
      if (err) {
        res.status(404).json({error: 'movie not found'});
        res.end();
      }
      else {
        res.status(200).json(movie.get());
        res.end();
        movie.destroy(function(err){
          if (err){

          }
          else {
            movie = null;
          }
        });
      }
    });
  });

// router
app.use('', router);

// listening port
var port = process.env.PORT || 8001;
console.log('homework4 listens on port ' + port);
app.listen(port);
