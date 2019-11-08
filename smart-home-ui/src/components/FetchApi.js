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
        data.devices.map(async device => {
          this.setState({
            [device.id]: device
          });
        });
        this.setState({ loading: false })
      }

      async updateState(deviceId) {
        const url = "http://localhost:8081/api/power/"+(deviceId)
        const response = await fetch(url);
        const data = await response.json();
        if (data.code === "200") {
          NotificationManager.success(data.message);
          this.setState({timer: 0});
          if (deviceId === "all") {
            this.fetchState()
          } else {
              this.state[deviceId].state = !this.state[deviceId].state;
          }
        } else {
          NotificationManager.error(data.message);
        }
      }

      async updateColor(color) {
        const url = "http://localhost:8081/api/color/all"+"/"+(color.r)+","+(color.g)+","+(color.b)
        const response = await fetch(url);
        const data = await response.json();
        if (data.code === "200") {
          NotificationManager.success(data.message);
          this.setState({timer: 0});
        } else {
          NotificationManager.error(data.message);
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
          
          if (!this.state[0]) {
            return <div>failed to collect device state</div>;
          }

          return (
            <div className="container">
              <div className="row">
                <p className="last-refresh"><img className="grow" src={refresh} height="40" width="40" onClick={this.fetchState.bind(this)} alt="switch"></img>Last refreshed {this.state.timer} seconds ago.</p>

              </div>
              <div className="row">

              <div className="device-box col-md-3">              
                  <div className="device-name">All Devices</div>
                  <CirclePicker 
                  onChange={ this.handleChange }
                  />    
                  <img className="device-switch grow" onClick={() => this.updateState('all')} src={this.state[0].state ? on : off} alt="switch"/>                                
                </div>

                <div className="device-box col-md-3">              
                  <div className="device-name">{this.state[0].name}</div>   
                  <img className="device-switch grow" onClick={() => this.updateState(0)} src={this.state[0].state ? on : off} alt="switch"/>
                                
                </div>

                <div className="device-box col-md-3">              
                  <div className="device-name">{this.state[1].name}</div>
                  <img className="device-switch grow" onClick={() => this.updateState(1)} src={this.state[1].state ? on : off} alt="switch"/>     
                </div>

              </div>
            </div>

          );
        }
}

export default FetchApi;