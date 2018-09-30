// server.js

// init project
var subdomain = require('express-subdomain');
var express = require('express');
var app = express();
var firebase = require('firebase');
var exphbs  = require('express-handlebars');

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.engine('handlebars', exphbs({
  defaultLayout: 'main',	
  helpers: {
    json: function (context) { return JSON.stringify(context); },
    replace: function(context) { return context.replace(/\s/g,'')},
    delay: function(context){return context * 0.05}
  }
}));
app.set('view engine', 'handlebars');

///FireBase Setup
var config = {
    apiKey: "AIzaSyCIi4whBgkNKOoediWDR2oxVePerWpMpHg",
    authproject: "yeemachine-fc409.firebaseapp.com",
    databaseURL: "https://yeemachine-fc409.firebaseio.com",
    projectId: "yeemachine-fc409",
    storageBucket: "yeemachine-fc409.appspot.com",
    messagingSenderId: "563165122469"
  };
firebase.initializeApp(config);
var database = firebase.database();
var RefData

var projectRef = database.ref('spreadsheets3');

projectRef.on("value", function(snapshot) {
  RefData = snapshot.val()
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

var router1 = express.Router();

//router1 specific routes
router1.get('/', function(request, response) {
  response.sendFile(__dirname + '/app/index.html');
});
// router1.get('/users', function(req, res) {
//     res.json([
//         { name: "Brian" }
//     ]);
// });
app.use(subdomain('work', router1));




// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
    response.render('home',{firebase: RefData});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
