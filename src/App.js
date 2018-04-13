import React, { Component } from 'react';
import './App.css';
import Joystick from './joystick';

class App extends Component {
  render() {
    return (
      <Joystick diameter={100} pointDiameter={10} />
    );
  }
}

export default App;
