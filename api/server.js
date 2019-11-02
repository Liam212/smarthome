var express = require('express');
var app = express();
var bodyParser = require("body-parser");
const fs = require("fs");
var magicHome = require("./api_modules/magichome/magichome.js")
var file = require("./devices.json")

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.urlencoded());
app.use(express.json());

app.get('/api/state/', function (req, res) {
  const response = magicHome.fetchState().then(function (response) {
    setTimeout(() => {
      res.header("Content-Type",'application/json');
      res.send(JSON.stringify(response, null, 4));
    }, 1000)
  });
});

app.get('/api/power/:id', function (req, res) {
    var id = req.params.id
    const response = magicHome.setState(id).then(function (response) {
      setTimeout(() => {
        console.log(response)
        res.send(response);
      }, 1000)
    });
});

app.get('/api/color/:id/:rgb', function (req, res) {
    let rgb = req.params.rgb.split(',');
    var id = req.params.id
    const response = magicHome.setColor(rgb, id).then(function (response) {
      setTimeout(() => {
        console.log(response)
        res.send(response);
      }, 1000)
    });
});

var server = app.listen(8081, function () {
   var host = "0.0.0.0"
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
