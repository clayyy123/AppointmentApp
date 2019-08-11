import React, { Component } from 'react';
import Handle from '../HOC/HandleChange';

class Login extends Component {
  render() {
    const { name, email, password } = this.props.state;
    return (
      <form>
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
          type="passwor"
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
