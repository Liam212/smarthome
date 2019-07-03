import magichue
import time
import json

light = magichue.Light('192.168.0.126')

while True:

    update = False

    with open('state.json') as json_file:
        state = json.load(json_file)

    with open('color.json') as json_file:
        color = json.load(json_file)

    time.sleep(1)

    intLight = int("".join(map(str, light.rgb)))
    intColor = int("".join(map(str, color)))

    if str(light.on) == state and intLight == intColor:
        print("203 No Change")
    else:
        update = True

    if update == True:

        light.rgb = color

        if state == "True":
            light.on = True
            print("200 OK")

        if state == "False":
            light.on = False
            print("200 OK")
