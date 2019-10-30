from flask import Flask, request
from flask_restful import Resource, Api
import subprocess
import json

app = Flask(__name__)
api = Api(app)

class deviceState(Resource):
    def get(self):
        subprocess.call('node modules/magichome/app.js', shell=True)
        with open("devices.json", 'r') as file:
            data = json.load(file)
            return data

api.add_resource(deviceState, '/state')


if __name__ == '__main__':
    app.run(debug=True)
