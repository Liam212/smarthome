from flask import Flask, request
from flask_restful import Resource, Api
import subprocess
import json

app = Flask(__name__)
api = Api(app)

class deviceState(Resource):
    def get(self):
        subprocess.call('node modules/magichome/app.js', shell=True)
        return 200

class deviceColor(Resource):
    def post(self):
        with open("modules/magichome/color.json", 'w') as file:
            rgb = {"r":request.form["r"],"g":request.form["g"],"b":request.form["b"]}
            json.dump(rgb, file, indent=4)
            file.flush()
            subprocess.call('node modules/magichome/color.js', shell=True)
            return 200

api.add_resource(deviceState, '/')
api.add_resource(deviceColor, '/color')

if __name__ == '__main__':
    app.run(debug=True)
