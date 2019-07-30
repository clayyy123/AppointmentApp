import React from 'react';

const Form3 = ({ resetHandler, goToApptHandler }) => {
  return (
    <>
      <h1 className="FormThree">Appointment has been requested!</h1>
      <button className="Form__button" onClick={resetHandler}>
        Make Another Appointment
      </button>
      <button className="Form__button" onClick={goToApptHandler}>
        Check Appointments
      </button>
    </>
  );
};

export default Form3;
