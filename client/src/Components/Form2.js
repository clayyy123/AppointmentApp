import React from 'react';

const Form2 = ({
  dateFormat,
  fields,
  onChangeHandler,
  displayTimes,
  backHandler,
  subHandler,
  message,
  resetTimes
}) => {
  return (
    <div className="FormTwo">
      <h1 className="Form__title">Select a date and time.</h1>
      <div className="FormOne__errorMessage">
        <h1 className="FormOne__error">{message}</h1>
      </div>
      <div className="FormTwo__top">
        <input
          className="FormTwo__date"
          type="date"
          name="date"
          min={dateFormat()}
          value={fields.date}
          onChange={onChangeHandler}
        />
        <div className="FormTwo__times">{displayTimes()}</div>
      </div>
      <div className="Form__buttons">
        <button className="Form__button" onClick={backHandler}>
          Back
        </button>
        <button className="Form__button" onClick={resetTimes}>
          Reset
        </button>
        <button
          className="Form__button"
          onClick={() => {
            subHandler(fields);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Form2;
