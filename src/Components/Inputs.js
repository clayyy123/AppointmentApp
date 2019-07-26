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
    let allTimes = [
      ...times.map(t => {
        return { ...t };
      })
    ];
    if (fields.start) {
      allTimes.forEach((t, i) =>
        t.time > fields.start
          ? (allTimes[i].taken = false)
          : (allTimes[i].taken = true)
      );
      return allTimes;
    }
    if (fields.date === dateFormat()) {
      allTimes.forEach((t, i) =>
        t.time > currentTime
          ? (allTimes[i].taken = false)
          : (allTimes[i].taken = true)
      );
      return allTimes;
    } else {
      return allTimes;
    }
  };

  //format time with :00 and AM/PM
  const formatTime = () => {
    let timeArray = filterTime();
    timeArray.forEach((t, i) => {
      if (t.time < 12) {
        timeArray[i].time += ':00 AM';
      } else if (t.time === 12) {
        timeArray[i].time += ':00 PM';
      } else {
        timeArray[i].time = t.time - 12 + ':00 PM';
      }
    });
    return timeArray;
  };

  //renders the time onto the DOM
  const displayTimes = () => {
    return formatTime().map((t, i) => {
      return t.taken ? (
        <h3 key={i} index={i}>
          {t.time} is unavailable!
        </h3>
      ) : (
        <h3 key={i} index={i} onClick={submitTime}>
          {t.time}
        </h3>
      );
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
          {displayTimes()}
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
