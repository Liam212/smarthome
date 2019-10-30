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
      console.log(device);
    });
  })
}

const setState = async (id) => {
  if (id == "all") {
    file.devices.map(async device => {
      let light = new Control(device.ip)
      light.queryState().then(function(data) {
        console.log(data)
        state = data.on
        if (state == false) {
          light.setPower(true).then(success => {
              return success
          });
        } else {
          light.setPower(false).then(success => {
              return success
          });
        }
      });
    })
  } else if (!isNaN(id)) {
    if (id > file.devices.length - 1) {
      console.log("This device does not exist")
    } else {
      let light = new Control(file.devices[id].ip)
      light.queryState().then(function(data) {
        console.log(data)
        state = data.on
        if (state == false) {
          light.setPower(true).then(success => {
              return success
          });
        } else {
          light.setPower(false).then(success => {
              return success
          });
        }
      });
    }
  } else {
    console.log("Error please enter the id of the device or all")
  }
}

const setColor = async (rgb, id) => {
  let light = new Control(file.devices[id].ip)
  light.setColor(rgb[0],rgb[1],rgb[2]).then(success => {
    console.log(success)
    return success
  });
}

module.exports = {
  fetchState,
  setColor,
  setState
};
