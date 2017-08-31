// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

var score = line => {
  var scoreCAPS = line.length - line.replace(/[A-Z]/g, '').length;
	line = line.toLowerCase()
	line = line.replace(/а/g, "a")
	line = line.replace(/х/g, "x")
	var score1 = line.split("ax").length-1;
	var score2 = line.split("a").length;
	var score3 = line.split("x").length;
	var score4 = line.split("ax").join("").length;
	return score1+score4+scoreCAPS/2
}


var scores = [
	"axaxax",
	"Ахаххаха",
	"ахахахах",
	"аахкаххахвыаъааахахах",
	"АХАХАХАХХАХА",
	"аъхъаъаъхахах",
	"ахах"
].map(score)

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/rate-laugh", function (request, response) {
  var line = request.query.line
  
  var num = score(line)
  
  response.send("{\"score\": \"" + num + "\"}");
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
