import React from 'react';
const Inputs = ({ onChangeHandler, fields, step, times, submitTime }) => {
  // const { onChangeHandler, fields, step } = props;

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

  const formatTime = () => {
    return times.map(t => {
      if (t < 12) {
        return t + ':00 AM';
      } else if (t === 12) {
        return t + ':00 PM';
      } else {
        return t - 12 + ':00 PM';
      }
    });
  };

  const onHoverHandler = e => {};

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
          {formatTime().map(t => {
            return <h3 onClick={submitTime}>{t}</h3>;
          })}
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
