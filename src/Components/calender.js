import React, { Component } from 'react';

class Form extends Component {
  state = {
    date: new Date()
  };
  render() {
    console.log(this.state.date);
    return (
      <>
        <h1>Form</h1>
      </>
    );
  }
}

export default Form;
