import React from 'react';
import { withRouter } from 'react-router-dom';

const Splash = props => {
  const goToFormHandler = () => {
    props.history.push('/form');
  };
  return (
    <div className="Splash">
      <div className="Splash__container">
        <h1 className="Splash__title">Well Health</h1>
        <button className="Splash__button" onClick={goToFormHandler}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default withRouter(Splash);
