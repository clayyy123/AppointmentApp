import React, { Component } from 'react';
import Inputs from './Inputs';

class Form extends Component {
  state = {
    fields: {
      name: '',
      reason: '',
      date: '',
      start: null,
      end: null
    },
    step: 1,
    click: 0,
    times: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
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

  submitTimeHandler = e => {
    const { click } = this.state;
    if (click === 0) {
      this.setState({
        fields: {
          ...this.state.fields,
          start: e.target.innerText
        },
        click: click + 1
      });
    } else if (click === 1) {
      this.setState({
        fields: {
          ...this.state.fields,
          end: e.target.innerText
        },
        click: 0
      });
    }
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
    const { fields, step, times } = this.state;
    return (
      <>
        <h1>Form</h1>
        <Inputs
          onChangeHandler={this.onChangeHandler}
          submitTime={this.submitTimeHandler}
          fields={fields}
          step={step}
          times={times}
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
            <button>Check Appointments</button>
          </>
        )}
      </>
    );
  }
}

export default Form;
