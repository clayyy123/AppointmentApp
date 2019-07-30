import React from 'react';
const Inputs = ({ onChangeHandler, fields, step, times, submitTime, appt }) => {
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
    // filter out times from the appointment array in state
    const datesAppt = appt.filter(a => a.date === fields.date);
    const timeOnly = allTimes.map(t => t.time);
    let start = null;
    let end = null;
    // modifies the time array according to the appointments made
    for (let i = 0; i < datesAppt.length; i++) {
      start = timeOnly.indexOf(datesAppt[i].start);
      end = timeOnly.indexOf(datesAppt[i].end);
      for (let j = start; j <= end; j++) {
        allTimes[j].taken = true;
      }
    }
    //when the user hasnt clicked a starting time
    if (!fields.start) {
      for (let i = 0; i < datesAppt.length; i++) {
        start = timeOnly.indexOf(datesAppt[i].start);
        end = timeOnly.indexOf(datesAppt[i].end);
        for (let j = start; j <= end; j++) {
          allTimes[j].taken = true;
          if (allTimes[end + 1] && !allTimes[end + 1].taken) {
            allTimes[end].taken = false;
          }
        }
      }
    } else if (fields.start) {
      //when the user has clicked a starting time
      start = timeOnly.indexOf(fields.start);
      for (let k = 0; k <= start; k++) {
        allTimes[k].taken = true;
      }
      for (let j = start; j < allTimes.length; j++) {
        if (allTimes[j + 1] && allTimes[j + 1].taken) {
          allTimes[j + 1].taken = false;
          break;
        }
      }
    }
    if (fields.date === dateFormat()) {
      allTimes.forEach((t, i) => {
        if (t.time <= currentTime) {
          allTimes[i].taken = true;
        }
      });
      return allTimes;
    }
    return allTimes;
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
