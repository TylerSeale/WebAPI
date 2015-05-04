// Tyler Seale
// homework5

// required variables
var usergrid = require('usergrid');
var express = require('express');
var app = express();
var router = express.Router();

// Connect to Apigee
var currentUser = new usergrid.client({
    orgName:'tseale',
    appName:'sandbox'
});

app.all('/movies', function(req, res){
  
  console.log(req.query);
  
  var properties = {  
type:'movies',
    name: req.query.title,

}; 
  
  var properties2 = {
    type: 'reviews',
    name: req.query.title
  };
  
  currentUser.getEntity(properties, function(err, existingUser){
  if (err){
      
      console.log(err);
      res.send("Cannot get first entity");
      
        
    } 
    else {
      
      currentUser.getEntity(properties2, function(err2, existingUser2){
        if(err2){
          res.send("Cannot get second entity");
        }
      else{
          
          //Make connection if query string reviews = true
          if(req.query.reviews == "true")
          {

            res.send({movie: existingUser, review:existingUser2});
                                     
          }
          
          //Display the entity without the connection
          else{
            res.send(existingUser);
          }
         
    }

  
});
    }
  });
});

// router
app.use('', router);

// listening port
var port = process.env.PORT || 8001;
console.log('homework5 listens on port ' + port);
app.listen(port);