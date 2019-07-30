import React from 'react';

const Form1 = ({ fields, onChangeHandler }) => {
  return (
    <div className="FormOne">
      <label>Full Name:</label>
      <input
        className="FormOne__input"
        type="text"
        name="name"
        value={fields.name}
        onChange={onChangeHandler}
      />
      <label>Reason For Visiting:</label>
      <textarea
        className="FormOne__text"
        type="text"
        name="reason"
        value={fields.reason}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default Form1;
