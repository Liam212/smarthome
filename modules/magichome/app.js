const { Control } = require('magic-home');
const fs = require('fs')
var file = require("../../devices.json")

const fetchState = async () => {
  file.devices.map(async device => {
    console.log(device.ip)
    let light = new Control(device.ip)
    light.queryState().then(function(data) {
      device.state = data.on
      device.color = data.color
      fs.writeFile("../../devices.json", JSON.stringify(file, null, 2), function (err) {
        if (err) return console.log(err);
      });
      console.log(data.on)
    });
  })
}

fetchState()
