import React, { Component } from 'react';
import './App.css';
import Form from './Components/Form';
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
      <>
        <h1>Well's Appointment App</h1>
        <Switch>
          <Route
            path="/form"
            render={() => {
              return <Form submitApp={this.submitHandler} />;
            }}
          />
        </Switch>
      </>
    );
  }
}

export default App;
