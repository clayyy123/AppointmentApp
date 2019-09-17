import React from 'react';
import { withRouter } from 'react-router-dom';
import Login from '../Components/Login';
import SignUp from '../Components/SignUp';

const Splash = ({
  clicked,
  click,
  user,
  setUser,
  loginToggle,
  toggle,
  hamHandler,
  ham
}) => {
  return (
    <div className="Splash">
      <div className="Splash__ham" onClick={hamHandler}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="Splash__container">
        <h1 className="Splash__title">BookOne</h1>
        <button className="Splash__button" onClick={click}>
          Book Now
        </button>
      </div>
      <div
        className={ham ? 'Splash__auth' : 'Splash__auth Splash__auth-active'}
      >
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
