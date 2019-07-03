from flask import Flask, request
from flask_restful import Resource, Api
import subprocess
import json

app = Flask(__name__)
api = Api(app)

class DeviceList(Resource):
    def get(self):
        subprocess.call('node modules/magichome/app.js', shell=True)
        return 200

@app.route('/color',methods = ['POST'])
def color():
    with open("modules/magichome/color.json", 'w') as file:
        rgb = [str(request.form["r"]), str(request.form["g"]), str(request.form["b"])]
        json.dump(rgb, file)
        subprocess.call('node modules/magichome/color.js', shell=True)
    return '200'

api.add_resource(DeviceList, '/')

if __name__ == '__main__':
    app.run(debug=True)
