const { Control } = require('magic-home');
const fs = require('fs')
var file = require("../../devices.json")

const fetchState = async (device) => {
  file.devices.map(async device => {
    let light = new Control(device.ip)
    light.queryState().then(function(data) {
      device.state = data.on
      device.color = data.color
      fs.writeFile("devices.json", JSON.stringify(file, null, 2), function (err) {
        if (err) return console.log(err);
      });
    });
  })
  return file;
}

const setState = async (id) => {
  if (id == "all") {
    file.devices.map(async device => {
      setPower(device.id)
  })
  } else if (!isNaN(id)) {
    if (id > file.devices.length - 1) {
      return {"error":"400", "message":"This device does not exist"}
    } else {
      setPower(id)
    }
  } else {
    return {"error":"400", "message":"Please enter a correct device id"}
  }
}

const setPower = async (id) => {
  let light = new Control(file.devices[id].ip)
  light.queryState().then(function (response) {
    let state = response.on
    light.setPower(!state).then(success => {
      return {"success":"200", "message":"The devices state has been updated"}
    });
  });
}

const setColor = async (rgb, id) => {
  for (var i = 0; i < rgb.length; i++) {
    if (!isNaN(rgb[i]) == false || rgb[i] > 255) {
      return {"error":"400", "message":"Please enter a valid rgb value"}
    } if (id > file.devices.length - 1) {
        return {"error":"400", "message":"This device does not exist"}
      }
  }
  if (id == "all") {
    file.devices.map(async device => {
      let light = new Control(device.ip)
      light.setColor(rgb[0],rgb[1],rgb[2]).then(success => {
        return success
      });
    });
  } else {
    let light = new Control(file.devices[id].ip)
    light.setColor(rgb[0],rgb[1],rgb[2]).then(success => {
      return success
    });
  }
}

module.exports = {
  fetchState,
  setColor,
  setState
};
