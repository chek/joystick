import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Joystick from './joystick';

class App extends Component {
  render() {
    return (
      <Joystick radius={100} pointRadius={10} />
    );
  }
}

export default App;
