import React from 'react';

const Form1 = ({ fields, onChangeHandler, message, nextHandler }) => {
  return (
    <div className="FormOne">
      <h1 className="Form__title">Give us your name and reason!</h1>
      <h1 className="FormOne__error">{message}</h1>
      <input
        className="FormOne__input"
        type="text"
        name="name"
        placeholder="Enter Your Full Name"
        value={fields.name}
        onChange={onChangeHandler}
      />
      <input
        className="FormOne__input"
        type="text"
        name="reason"
        placeholder="Reason for Appointment"
        value={fields.reason}
        onChange={onChangeHandler}
      />
      <button className="Form__button" onClick={nextHandler}>
        Next
      </button>
    </div>
  );
};

export default Form1;
