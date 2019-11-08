import React from 'react';
import FetchApi from './components/FetchApi'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { NotificationContainer} from 'react-notifications';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="device-name" style={{fontSize: 40 + 'px'}}>Your devices</h1>
          <FetchApi />
          <NotificationContainer />
        </header>
      </div>
    );
  }

}

export default App;
