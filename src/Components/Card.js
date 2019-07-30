import React from 'react';

const Card = ({ a }) => {
  const formatTime = time => {
    if (time < 12) {
      return (time += ':00 AM');
    } else if (time === 12) {
      return (time += ':00 PM');
    } else {
      return (time = time - 12 + ':00 PM');
    }
  };
  return (
    <div className="Card">
      <h1 className="Card__name">Name: {a.name}</h1>
      <h3 className="Card__time">
        Time: {formatTime(a.start)} - {formatTime(a.end)}
      </h3>
      <p className="Card__body">Reason: {a.reason}</p>
      <h2 className="Card__date">Booked at: {a.date}</h2>
    </div>
  );
};

export default Card;
