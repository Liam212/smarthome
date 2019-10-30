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
  magicHome.fetchState()
  setTimeout(function () {
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(file, null, 2));
  }, 1000);
});

app.post('/api/power/', function (req, res) {
    let id = req.body.id
    response = magicHome.setState(id)
    setTimeout(function () {
      res.send(JSON.stringify(response, null, 2));
    }, 1000);
});

app.post('/api/color/', function (req, res) {
    let rgb = [req.body.r, req.body.g, req.body.b]
    let id = req.body.id
    response = magicHome.setColor(rgb, id)
    setTimeout(function () {
      res.send(JSON.stringify(response, null, 2));
    }, 1000);
});

var server = app.listen(8081, function () {
   var host = "0.0.0.0"
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
