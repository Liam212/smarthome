import React from 'react';
import on from "./on.png";
import off from "./off.png";
import refresh from "./refresh.png"
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';
import { CirclePicker } from 'react-color';

class FetchApi extends React.Component {
    
      constructor(props) {
          super(props);
          this.state = {
            loading: true,
            timer: 0
          };
        }
  
      async componentDidMount() {
        this.fetchState()  
        this.interval = setInterval(
          () =>
          this.setState({
            timer: this.state.timer + 1})
          ,1000);
      }

      async fetchState() {
        this.setState({timer: 0})
        const url = "http://localhost:8081/api/state"
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ loading: false, devices: data })
      }

      async updateState(deviceId) {
        if (deviceId === 'all') {
          for (let index = 0; index < this.state.devices.length; index++) {
            const url = "http://localhost:8081/api/power/"+(index)
            const response = await fetch(url);
            const data = await response.json();
            if (data === true) {
              this.state.devices[index].device.on = !this.state.devices[index].device.on;
              NotificationManager.success("Device updated");
              this.setState({timer: 0});
            } else {
              NotificationManager.error(data.message);
            }
          }
          } else {
            const url = "http://localhost:8081/api/power/"+(deviceId)
            const response = await fetch(url);
            const data = await response.json();
            if (data === true) {
              this.state.devices[deviceId].device.on = !this.state.devices[deviceId].device.on;
              NotificationManager.success("Device updated");
              this.setState({timer: 0});
            } else {
              NotificationManager.error(data.message);
            }
          }
      }
  

      async updateColor(color) {
        for (let index = 0; index < this.state.devices.length; index++) {
          const url = "http://localhost:8081/api/color/"+index+"/"+(color.r)+","+(color.g)+","+(color.b)
          const response = await fetch(url);
          const data = await response.json();
          if (data.code === "200") {
            NotificationManager.success("Device updated");
            this.setState({timer: 0});
          } else {
            NotificationManager.error(data.message);
          }
        }
      }

      componentWillUnmount() {
        clearInterval(this.interval);
      }

      handleChange = (color) => {
        this.updateColor(color.rgb)
      };

        render() {
          if (this.state.loading) {
            return <div>loading...</div>;
          }
          
          if (!this.state.devices[0]) {
            return <div>failed to collect device state</div>;
          }

          return (
            <div className="container">
              <div className="row">
                <p className="last-refresh"><img className="grow" src={refresh} height="40" width="40" onClick={this.fetchState.bind(this)} alt="switch"></img>Last refreshed {this.state.timer} seconds ago.</p>
              </div>
              <div className="row">       
                <div className="device-box col-md-3">
                  <div className="device-name">Color Palette</div>
                  <CirclePicker 
                  onChange={ this.handleChange }     
                  />                       
                </div>
                <div className="device-box col-md-3">
                  <div className="device-name">All Devices</div>
                  <img className="device-switch grow" onClick={() => this.updateState('all')} src={this.state.devices[0].device.on ? on : off} alt="switch"/>                           
                </div>
                <div className="device-box col-md-3">              
                  <div className="device-name">{this.state.devices[0].mode}</div>   
                  <img className="device-switch grow" onClick={() => this.updateState(0)} src={this.state.devices[0].device.on ? on : off} alt="switch"/>      
                </div>
                <div className="device-box col-md-3">              
                  <div className="device-name">{this.state.devices[0].mode}</div>
                  <img className="device-switch grow" onClick={() => this.updateState(1)} src={this.state.devices[1].device.on  ? on : off} alt="switch"/>     
                </div>
            </div>
          </div>

          );
        }
}

export default FetchApi;