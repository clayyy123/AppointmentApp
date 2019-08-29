import React, { Component } from 'react';
import './css/style.css';
import Form from './Components/Form';
import Appointment from './Layouts/Appointments';
import Splash from './Layouts/Splash';
import Navbar from './Components/Navbar';
import User from './Layouts/User';
import Profile from './Layouts/Profile';
import { Switch, Route, withRouter } from 'react-router-dom';
import httpClient from './httpClient';

class App extends Component {
  state = {
    clicked: false,
    user: null,
    appointments: [],
    bookedUser: null,
    loginToggle: false
  };

  async componentDidMount() {
    const user = await httpClient.getCurrentUser();
    if (user) {
      this.setCurrentUser(user);
    }
  }

  submitHandler = newApp => {
    const { appointments } = this.state;
    this.setState({
      appointments: [...appointments, newApp]
    });
  };

  logOutHandler = () => {
    httpClient.logOut();
    this.setState({
      user: null,
      clicked: false
    });
  };

  clickHandler = () => {
    this.setState({
      clicked: true
    });
    this.props.history.push('/users');
  };

  setCurrentUser = user => {
    this.setState({
      user,
      clicked: true
    });
  };

  setBookedUser = user => {
    this.setState({
      bookedUser: user
    });
    this.props.history.push('/form');
  };

  toggleHandler = () => {
    this.setState({
      loginToggle: !this.state.loginToggle
    });
  };

  render() {
    const { appointments, clicked, bookedUser, user } = this.state;
    return (
      <div className="container">
        {(clicked || user) && (
          <Navbar logOut={this.logOutHandler} user={user} />
        )}

        <Switch>
          <Route
            path="/profile/:id"
            render={props => <Profile user={user} {...props} />}
          />
          <Route
            path="/users"
            render={() => (
              <User bookUser={this.setBookedUser} bookedUser={bookedUser} />
            )}
          />
          <Route
            path="/form"
            render={props => {
              return (
                <Form
                  {...props}
                  submitApp={this.submitHandler}
                  appt={this.state.appointments}
                  bookedUser={bookedUser}
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
                  loginToggle={this.state.loginToggle}
                  toggle={this.toggleHandler}
                />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
