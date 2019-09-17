import React, { Component } from 'react';
import Handle from '../HOC/HandleChange';
import httpClient from '../httpClient.js';

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
    const { name, email, password, company } = this.props.state;
    return (
      <form onSubmit={this.signUpHandler} className="Signup">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={this.props.onChangeHandler}
          className="Signup__input"
        />
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={this.props.onChangeHandler}
          className="Signup__input"
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={this.props.onChangeHandler}
          className="Signup__input"
        />
        <label>Company</label>
        <input
          type="text"
          name="company"
          value={company}
          onChange={this.props.onChangeHandler}
          className="Signup__input"
        />
        <input type="submit" value="Sign Up" className="Signup__button" />
        <h4 onClick={this.props.toggle} style={{ cursor: 'pointer' }}>
          Have an account?
        </h4>
      </form>
    );
  }
}

export default Handle(SignUp);
