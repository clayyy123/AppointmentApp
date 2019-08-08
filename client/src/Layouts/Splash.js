import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import Login from '../Components/Login';
import SignUp from '../Components/SignUp';

const Splash = ({ clicked, click }) => {
  return (
    <div className="Splash">
      <div className="Splash__container">
        <h1 className="Splash__title">Well Health</h1>
        <button className="Splash__button" onClick={click}>
          Book Now
        </button>
        {clicked && <Redirect to="/form" />}
      </div>
      <Login />
      <SignUp />
    </div>
  );
};

export default withRouter(Splash);
