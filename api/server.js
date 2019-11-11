var express = require('express');
var app = express();
var magicHome = require("./api_modules/magichome/magic-home-api.js")

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.urlencoded());
app.use(express.json());

app.get('/api/state/:deviceId', async (req, res) => {
  var deviceId = req.params.deviceId
  const response = await magicHome.deviceState(deviceId)
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(response, null, 4));
});

app.get('/api/state/', async (req, res) => {
  const response = await magicHome.fetchAllDevices()
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(response, null, 4));
});

app.get('/api/power/:deviceId', async (req, res) => {
  var deviceId = req.params.deviceId
  const response = await magicHome.setState(deviceId)
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(response, null, 4));
});

app.get('/api/color/:deviceId/:deviceColor', async (req, res) => {
    let deviceColor = req.params.deviceColor.split(',');
    var deviceId = req.params.deviceId
    const response = await magicHome.setColor(deviceId, deviceColor)
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(response, null, 4));
});

var server = app.listen(8081, function () {
   var host = "0.0.0.0"
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
