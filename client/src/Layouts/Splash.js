import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import Login from '../Components/Login';
import SignUp from '../Components/SignUp';

const Splash = ({ clicked, click, user, setUser, loginToggle, toggle }) => {
  return (
    <div className="Splash">
      <div className="Splash__container">
        <h1 className="Splash__title">Well Health</h1>
        <button className="Splash__button" onClick={click}>
          Book Now
        </button>
      </div>
      <div className="Splash__auth">
        {loginToggle ? (
          <SignUp setUser={setUser} toggle={toggle} />
        ) : (
          <Login setUser={setUser} toggle={toggle} />
        )}
      </div>
    </div>
  );
};

export default withRouter(Splash);
