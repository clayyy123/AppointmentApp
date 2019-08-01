import React from 'react';

const Form3 = ({ resetHandler, goToApptHandler }) => {
  return (
    <div className="FormThree">
      <h1 className="FormThree__title">Appointment has been requested!</h1>
      <button
        className="Form__button FormThree__buttons"
        onClick={resetHandler}
      >
        Make Another Appointment
      </button>
      <button
        className="Form__button FormThree__buttons"
        onClick={goToApptHandler}
      >
        Check Appointments
      </button>
    </div>
  );
};

export default Form3;
