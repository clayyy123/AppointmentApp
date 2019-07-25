import React from 'react';
const Inputs = props => {
  const { onChangeHandler, fields, step } = props;

  const dateFormat = () => {
    let currentDate = new Date();
    let formattedDate =
      currentDate.getFullYear() +
      '-' +
      (currentDate.getMonth() + 1 < 10
        ? '0' + (currentDate.getMonth() + 1)
        : currentDate.getMonth() + 1) +
      '-' +
      currentDate.getDate();
    return formattedDate;
  };

  return (
    <>
      {step === 1 && (
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            value={fields.name}
            onChange={onChangeHandler}
          />
          <label>Reason For Visiting:</label>
          <textarea
            type="text"
            name="reason"
            value={fields.reason}
            onChange={onChangeHandler}
          />
        </div>
      )}
      {step === 2 && (
        <div>
          <input
            type="date"
            name="date"
            min={dateFormat()}
            onChange={onChangeHandler}
          />
        </div>
      )}
      {step === 3 && (
        <div>
          <h1>Appointment has been requested!</h1>
        </div>
      )}
    </>
  );
};

export default Inputs;
