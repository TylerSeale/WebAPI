'use strict';

var express = require('express');
var app = express();
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 http://www.w3schools.com/js/js_strict.asp
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');


/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  hello: hello
};



function hello(req, res) {
    var GitHubApi = require("github");

    var github = new GitHubApi({
        // required
        version: "3.0.0"
    });


    var token = "165931d0f79a085a01f7999bfa65cacde73bdb29";
    var repos = "repos";

    github.authenticate({
        type: "oauth",
        token: token
    });

    github.repos.getFromUser({user: 'TylerSeale'}, function(err, res2) {
      console.log("GOT ERR?", err);
      console.log("GOT RES?", res2);

      res.json(res2);
          });

}





