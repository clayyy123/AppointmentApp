import React from 'react';
import Form1 from './Form1';
import Form2 from './Form2';
import Form3 from './Form3';
const Inputs = ({
  onChangeHandler,
  fields,
  step,
  times,
  submitTime,
  appt,
  message,
  nextHandler,
  backHandler,
  submitHandler,
  resetHandler,
  goToApptHandler
}) => {
  //Formats the date into "YEAR-MONTH-DAY"
  const dateFormat = () => {
    let currentDate = new Date();
    let formattedDate =
      currentDate.getFullYear() +
      '-' +
      (currentDate.getMonth() + 1 < 10
        ? '0' + (currentDate.getMonth() + 1)
        : currentDate.getMonth() + 1) +
      '-' +
      (currentDate.getDate() < 10
        ? '0' + currentDate.getDate()
        : currentDate.getDate());
    console.log(formattedDate);
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
          if (
            allTimes[end + 1] &&
            (!allTimes[end + 1].taken || allTimes[end + 1].taken)
          ) {
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
          //grey out the times after the end time so users can book over other users
          for (let k = j + 2; k < allTimes.length; k++) {
            allTimes[k].taken = true;
          }
          break;
        }
      }
    }
    //users cant choose a time earlier if the Date is today
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
    let start = null;
    let end = null;
    let allTimes = [
      ...times.map(t => {
        return { ...t };
      })
    ];
    const timeOnly = allTimes.map(t => t.time);
    start = timeOnly.indexOf(fields.start);
    end = timeOnly.indexOf(fields.end);
    return fields.start && fields.end
      ? formatTime().map((t, i) => {
          return i >= start && i <= end ? (
            <h3 key={i} index={i} className="FormTwo__time FormTwo__chosen">
              {t.time}
            </h3>
          ) : (
            <h3
              key={i}
              index={i}
              className="FormTwo__time FormTwo__time-inactive"
            >
              {t.time}
            </h3>
          );
        })
      : formatTime().map((t, i) => {
          return t.taken ? (
            <h3
              key={i}
              index={i}
              className="FormTwo__time FormTwo__time-inactive"
            >
              {t.time}
            </h3>
          ) : (
            <h3
              key={i}
              index={i}
              className="FormTwo__time FormTwo__time-active"
              onClick={submitTime}
            >
              {t.time}
            </h3>
          );
        });
  };

  return (
    <>
      {step === 1 && (
        <Form1
          fields={fields}
          onChangeHandler={onChangeHandler}
          message={message}
          nextHandler={nextHandler}
        />
      )}
      {step === 2 && (
        <Form2
          dateFormat={dateFormat}
          fields={fields}
          onChangeHandler={onChangeHandler}
          displayTimes={displayTimes}
          backHandler={backHandler}
          subHandler={submitHandler}
          message={message}
        />
      )}
      {step === 3 && (
        <Form3 resetHandler={resetHandler} goToApptHandler={goToApptHandler} />
      )}
    </>
  );
};

export default Inputs;
