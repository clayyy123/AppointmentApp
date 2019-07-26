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

  //users cant choose a start time before the current time
  const filterTime = () => {
    let currentDate = new Date();
    let currentTime = currentDate.getHours();
    if (fields.date === dateFormat()) {
      return times.filter(t => t.time > currentTime);
    } else {
      return times;
    }
  };

  const formatTime = () => {
    return filterTime().map(t => {
      if (t.time < 12) {
        return t.time + ':00 AM';
      } else if (t.time === 12) {
        return t.time + ':00 PM';
      } else {
        return t.time - 12 + ':00 PM';
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
            value={fields.date}
            onChange={onChangeHandler}
          />
          {formatTime().map((t, i) => {
            return (
              <h3 key={i} index={i} onClick={submitTime}>
                {t}
              </h3>
            );
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
