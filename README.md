# Smart-Home

 Smarthome is a simple Flask api that keeps ITO devices in one place. The API activates different modules that support different smart devices.

## Installation

First of all you must add your devices to the devices.json file. Enter a id, name and ip. The rest of the data will be updated with the first request. Now you can start the local API. Run the server.js json file found in the api folder. Optionally you can also run the React UI. For this open to terminals and run both commands.

```bash
cd api
npm install
node server.js
```

Now for the ***React UI***

```bash
cd smart-home-ui
npm install
npm start
```

Currently supported devices:

- Magic Home LED Controller (ESP-12E)

## Usage

Example response from /api/**state**/

```
/api/state/

{
    "devices": [
        {
            "id": 0,
            "name": "Desk",
            "ip": "192.168.0.126",
            "state": true,
            "color": {
                "red": 0,
                "green": 225,
                "blue": 0
            }
        }
      ]
    }
```

A request can be made to an individual device or all devices.

```
/api/power/all

/api/power/deviceID

/api/color/all/255,255,255
```

## Supported calls

api/**state** - This gets the state of all the devices in your devices.json file.

api/**power**/all - This request will toggle your light on/off.

api/**color**/deviceID/255,155,155 - This changes the color of selected devices using an rgb value.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

**v1.1.1**
