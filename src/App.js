import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Components/calender';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  state = {
    name: '',
    appointments: []
  };
  render() {
    return (
      <>
        <h1>Well's Appointment App</h1>
        <Switch>
          <Route
            path="/form"
            render={() => {
              return <Form />;
            }}
          />
        </Switch>
      </>
    );
  }
}

export default App;
