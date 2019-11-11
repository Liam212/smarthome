const { Control } = require('magic-home');
var file = require("../../devices.json")

async function fetchAllDevices () {  
  const promises = file.map(async device => {
      let light = new Control(device.address);
      device = await light.queryState(true)
    return {
      device
    }
  })
  const data = await Promise.all(promises)
  if (data == null) {
    return {"code":"500", "message":"Failed to connect to the device"}
  } else {
      return data
    } 
}

async function deviceState(deviceId) {
  response = await isValid(deviceId)
     if (response.code == '200') {
          let light = new Control(file[deviceId].address);
          data = await light.queryState(true)
          if (data == null) {
            return {"code":"500", "message":"Failed to connect to the device"}
          } else {
              return data
            } 
      } else {
          return response
      }
}  

async function setState(deviceId) {
  response = await isValid(deviceId)
    if (response.code == '200') {
      let light = new Control(file[deviceId].address);
      state = await deviceState(deviceId);
      data = await light.setPower(!state.on)
      if (data == null) {
        return {"code":"500", "message":"Failed to connect to the device"}
      } else {
          return data
        } 
    } else {
      return response
    }
}

async function setColor(deviceId, deviceColor) {
  for (var i = 0; i < deviceColor.length; i++) {
    if (!isNaN(deviceColor[i]) == false || deviceColor[i] > 255) {
      return {"code":"400", "message":"Please enter a valid rgb value"}
    }
  } 
  response = await isValid(deviceId)
    if (response.code == '200') {
        let light = new Control(file[deviceId].address);
        light.setColor(deviceColor[0],deviceColor[1],deviceColor[2])
        return {"code":"200", "message":"The devices color has been updated"}
    } else {
        return response
    }
  }  

async function isValid(deviceId) {
  if (deviceId == 'all') {
      return {"code":"501", "message":"Feature not implemented in this version"}
  } else if (!isNaN(deviceId)) {
      if (deviceId > file.length - 1) {
          return {"code":"400", "message":"This device does not exist"}
      } else {
          return {"code":"200", "message":"The device state has been updated"}
      }
  } else {
      return {"code":"400", "message":"Please enter a valid device id"}
  }
}

module.exports = {
  deviceState,
  setState,
  setColor,
  fetchAllDevices
};
