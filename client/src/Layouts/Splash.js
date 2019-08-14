import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import Login from '../Components/Login';
import SignUp from '../Components/SignUp';

const Splash = ({ clicked, click, user, setUser }) => {
  return (
    <div className="Splash">
      {(clicked || user) && <Redirect to="/users" />}
      <div className="Splash__container">
        <h1 className="Splash__title">Well Health</h1>
        <button className="Splash__button" onClick={click}>
          Book Now
        </button>
      </div>
      <Login setUser={setUser} />
      <SignUp setUser={setUser} />
    </div>
  );
};

export default withRouter(Splash);
