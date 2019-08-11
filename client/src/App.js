import React, { Component } from 'react';
import './css/style.css';
import Form from './Components/Form';
import Appointment from './Layouts/Appointments';
import Splash from './Layouts/Splash';
import Navbar from './Components/Navbar';
import { Switch, Route } from 'react-router-dom';
import httpClient from './httpClient';

class App extends Component {
  state = {
    clicked: false,
    user: null,
    appointments: []
  };

  async componentDidMount() {
    const user = await httpClient.getCurrentUser();
    if (user) {
      this.setState({
        user
      });
    }
  }

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

  setCurrentUser = user => {
    this.setState({
      user
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
                  clicked={clicked}
                  click={this.clickHandler}
                  user={this.state.user}
                  setUser={this.setCurrentUser}
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
