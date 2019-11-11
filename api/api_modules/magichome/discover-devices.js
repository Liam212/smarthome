const { Discovery } = require('magic-home');
const fs = require('fs')
var file = require("../../devices.json")

let discovery = new Discovery(true);

async function discoverDevices() {
    if (file[0] == null) {
      let devices = await discovery.scan(1000)
      console.log("Discovered "+devices.length+" new devices")
      fs.writeFile("../../devices.json", JSON.stringify(devices, null, 4), function(err) {
          if(err) {
            return {"code":"404","message":err}
          } else {
            return {"code":"200","message":"JSON file has been updated"}
          }
      }); 
    } else {
        return {"message":"Devices have already been discovered"}
    }
}
