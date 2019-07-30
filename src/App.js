import React, { Component } from 'react';
import './css/style.css';
import Form from './Components/Form';
import Appointment from './Layouts/Appointments';
import Splash from './Layouts/Splash';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  state = {
    clicked: false,
    appointments: [
      {
        date: '2019-06-20',
        name: 'asdfasdf',
        reason: 'asdfasdfasdafsdfasdfasdfasdfasdfadsf',
        start: 9,
        end: 11
      },
      {
        date: '2019-06-20',
        name: 'asdfasdf',
        reason: 'asdfasdfasdafsdfasdfasdfasdfasdfadsf',
        start: 15,
        end: 17
      },
      {
        date: '2019-06-20',
        name: 'asdfasdf',
        reason: 'asdfasdfasdafsdfasdfasdfasdfasdfadsf',
        start: 15,
        end: 17
      }
    ]
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
    const { appointments } = this.state;
    return (
      <div className="container">
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
