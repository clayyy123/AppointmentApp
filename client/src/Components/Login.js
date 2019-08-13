import React, { Component } from 'react';
import Handle from '../HOC/HandleChange';
import httpClient from '../httpClient.js';
class Login extends Component {
  loginHandler = async e => {
    e.preventDefault();
    const { setUser } = this.props;
    const data = {
      email: this.props.state.email,
      password: this.props.state.password
    };
    const loggedUser = await httpClient.logIn(data);
    if (loggedUser.response.success) {
      setUser(loggedUser.token);
    }
  };
  render() {
    const { email, password } = this.props.state;
    return (
      <form onSubmit={this.loginHandler}>
        <input
          type="text"
          name="email"
          value={email}
          onChange={this.props.onChangeHandler}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={this.props.onChangeHandler}
        />
        <input type="submit" value="Login" />
      </form>
    );
  }
}

export default Handle(Login);
