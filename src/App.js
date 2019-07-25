import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Calender from './Components/calender';

class App extends Component {
  state = {
    name: '',
    appointments: []
  };
  render() {
    return (
      <>
        <h1>Clay's Appointment App</h1>
        <Calender />
      </>
    );
  }
}

export default App;
