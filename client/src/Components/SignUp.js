import React, { Component } from 'react';
import Handle from '../HOC/HandleChange';
import httpClient from '../httpClient.js';
import { Redirect } from 'react-router-dom';

class SignUp extends Component {
  signUpHandler = async e => {
    const { setUser } = this.props;
    e.preventDefault();
    const { state } = this.props;
    const createdUser = await httpClient.signUp(state);
    if (createdUser.response.success) {
      setUser(createdUser.token);
    }
  };
  render() {
    const { name, email, password } = this.props.state;
    return (
      <form onSubmit={this.signUpHandler}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={this.props.onChangeHandler}
        />
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
        <input type="submit" value="Sign Up" />
      </form>
    );
  }
}

export default Handle(SignUp);
