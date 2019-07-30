import React, { Component } from 'react';
import './App.css';
import Form from './Components/Form';
import Appointment from './Layouts/Appointments';
import Splash from './Layouts/Splash';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  state = {
    name: '',
    appointments: []
  };

  submitHandler = newApp => {
    const { appointments } = this.state;
    this.setState({
      appointments: [...appointments, newApp]
    });
  };

  render() {
    return (
      <div className="container">
        <h1 className="container__title">Well's Appointment App</h1>
        <Switch>
          <Route
            path="/form"
            render={props => {
              return (
                <Form
                  {...props}
                  submitApp={this.submitHandler}
                  appt={this.state.appointments}
                />
              );
            }}
          />
          <Route
            path="/appointments"
            render={() => {
              return <Appointment />;
            }}
          />
          <Route
            path="/"
            render={() => {
              return <Splash />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
