var db = require('./app/db');

var express = require("express");
var app = express();

app.configure(function(){
    app.use(express.logger());
    app.use('/assets',express.static(__dirname + '/assets'));
});

app.get('/', function(request, response) {
  response.sendfile(__dirname + '/index.html');
});

app.get('/rest/user', function(request, response) {
    var name = request.param('name');
    db.User.findOne({name: name}, function(error, data) {
        response.json(data);
    });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});