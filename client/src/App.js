import React, { Component } from 'react';
import './css/style.css';
import Form from './Components/Form';
import Appointment from './Layouts/Appointments';
import Splash from './Layouts/Splash';
import Navbar from './Components/Navbar';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  state = {
    clicked: false,
    appointments: []
  };

  submitHandler = newApp => {
    const { appointments } = this.state;
    this.setState({
      appointments: [...appointments, newApp]
    });
  };

  clickHandler = () => {
    this.setState({
      clicked: true
    });
  };
  render() {
    const { appointments, clicked } = this.state;
    return (
      <div className="container">
        <Navbar />
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
              return <Appointment appt={appointments} />;
            }}
          />
          <Route
            path="/"
            render={() => {
              return (
                <Splash
                  clicked={this.state.clicked}
                  click={this.clickHandler}
                />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
