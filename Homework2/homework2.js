// Tyler Seale
// Web API Homework 2

// Required
var http = require('http');
var url = require('url');

// Allowed methods
var availableRequests = [
  {urn: '/gets', method: 'GET'},
  {urn: '/posts', method: 'POST'},
  {urn: '/puts', method: 'PUT'},
  {urn: '/deletes', method: 'DELETE'}
]

// Check for valid request
function isValidRequest(urn, method) {

  var isValid = false;
  
  availableRequests.some(function(requirement) {
    
    isValid = (requirement.urn === urn && requirement.method === method);
    return isValid;
  });
  
  return isValid;
}


// Invalid Response
function invalidResponse(res, status) {
  status = status || 400;
  var error = {message: 'unknown method'};
  res.writeHead(status, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(error));
}

// Valid Response
function validResponse(res, req) {
  var reqUrl = url.parse(req.url, true);

  var response = {requestHeaders: req.headers, queryParams: reqUrl.query};

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(response));
}


// Main
http.createServer(function (req, res) {

  var reqUrl = url.parse(req.url);

  if (!isValidRequest(reqUrl.pathname, req.method)) {
  
    var httpStatus = reqUrl.pathname === '/' ? 400 : 405;
    invalidResponse(res, httpStatus);
  }

  validResponse(res, req);

}).

// Port
listen(8001, function() {
  console.log('homework2 listens on port 8001');
});
