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
    times: [
      { time: 9, taken: false },
      { time: 10, taken: false },
      { time: 11, taken: false },
      { time: 12, taken: false },
      { time: 13, taken: false },
      { time: 14, taken: false },
      { time: 15, taken: false },
      { time: 16, taken: false },
      { time: 17, taken: false },
      { time: 18, taken: false },
      { time: 19, taken: false }
    ]
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
      step: this.state.step + 1
    });
    submitApp(app);
  };

  submitTimeHandler = e => {
    const { click } = this.state;
    let index = e.target.attributes[0].value;
    if (click === 0) {
      this.setState({
        fields: {
          ...this.state.fields,
          start: this.state.times[index].time
        },
        click: click + 1
      });
    } else if (click === 1) {
      this.setState({
        fields: {
          ...this.state.fields,
          end: this.state.times[index].time
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
