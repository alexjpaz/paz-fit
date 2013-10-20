var db = require('./app/db');

var express = require("express");
var app = express();

app.configure(function(){
    app.use(express.logger());
    app.use('/assets',express.static(__dirname + '/assets'));
    app.use(express.bodyParser());
});

app.get('/', function(request, response) {
  response.sendfile(__dirname + '/index.html');
});

app.get('/rest/person/:personId', function(request, response) {
    db.Person.findOne({name: request.params.personId}, function(error, data) {
        response.json(data);
    });
});

app.get('/rest/person/:personId/max', function(request, response) {
    query = db.Person.findOne({name: request.params.personId});
    query.select('maxes');
    
    query.exec(function(error, data) {
    	response.json(data.maxes);
    });
});

app.get('/rest/person/:personId/personal-record', function(request, response) {
    query = db.Person.findOne({name: request.params.personId});
    query.select('personalRecords');
	
    query.exec(function(error, data) {
    	if(error) {
		throw error;
    	}
    	
        response.json(data.personalRecords);
    });
});

app.post('/rest/person/:personId/personal-record', function(request, response) {
    var prDto = request.body;
    db.Person.findOne({name: request.params.personId}, function(error, data) {
        data.personalRecords.push(prDto);
        data.save();
        response.json(prDto);
    });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
