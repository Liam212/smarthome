from flask import Flask, request
from flask_restful import Resource, Api
import subprocess

app = Flask(__name__)
api = Api(app)

class DeviceList(Resource):
    def get(self):
        subprocess.call('node modules/magichome/app.js', shell=True)
        return 200

@app.route('/color',methods = ['POST'])
def color():
      return 404

api.add_resource(DeviceList, '/')

if __name__ == '__main__':
    app.run(debug=True)
