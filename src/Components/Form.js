import React, { Component } from 'react';
import Inputs from './Inputs';

class Form extends Component {
  state = {
    fields: {
      name: '',
      reason: '',
      date: ''
    },
    step: 1
  };

  onChangeHandler = e => {
    console.log(this.state);
    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value
      }
    });
  };

  submitHandler = app => {
    const { submitApp } = this.props;
    this.setState({
      fields: {
        name: '',
        reason: ''
      },
      step: this.state.step < 3 && this.state.step + 1
    });
    submitApp(app);
  };

  nextHandler = () => {
    this.setState({
      step: this.state.step + 1
    });
  };

  backHandler = () => {
    this.setState({
      step: this.state.step - 1
    });
  };

  resetHandler = () => {
    this.setState({
      step: 1
    });
  };

  render() {
    const { fields, step } = this.state;
    return (
      <>
        <h1>Form</h1>
        <Inputs
          onChangeHandler={this.onChangeHandler}
          fields={fields}
          step={step}
          date={this.state.currentDate}
        />
        {this.state.step === 1 && (
          <button onClick={this.nextHandler}>Next</button>
        )}
        {this.state.step < 3 && this.state.step > 1 && (
          <>
            <button onClick={this.backHandler}>Back</button>
            <button
              onClick={() => {
                this.submitHandler(this.state.fields);
              }}
            >
              Submit
            </button>
          </>
        )}
        {this.state.step === 3 && (
          <>
            <button onClick={this.resetHandler}>
              Make Another Appointment
            </button>
            <button>Check Your Appointments</button>
          </>
        )}
      </>
    );
  }
}

export default Form;
