import React, { Component } from 'react';
import Handle from '../HOC/HandleChange';

class SignUp extends Component {
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
        <input type="submit" value="Sign Up" />
      </form>
    );
  }
}

export default Handle(SignUp);
