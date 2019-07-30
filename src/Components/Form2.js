import React from 'react';

const Form2 = ({ dateFormat, fields, onChangeHandler, displayTimes }) => {
  return (
    <div className="FormTwo">
      <input
        className="FormTwo__date"
        type="date"
        name="date"
        min={dateFormat()}
        value={fields.date}
        onChange={onChangeHandler}
      />
      {displayTimes()}
    </div>
  );
};

export default Form2;
