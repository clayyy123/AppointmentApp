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
    message: '',
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
    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value
      },
      message: ''
    });
  };

  submitHandler = app => {
    const { submitApp } = this.props;
    const { fields } = this.state;
    if (!fields.date || !fields.start || !fields.end) {
      this.setState({
        message: 'Date and Times must be filled'
      });
    } else {
      this.setState({
        fields: {
          name: '',
          reason: '',
          date: ''
        },
        step: this.state.step + 1,
        message: ''
      });
      submitApp(app);
    }
  };

  submitTimeHandler = e => {
    const { fields } = this.state;
    let index = e.target.attributes[0].value;
    if (!fields.date) {
      this.setState({
        message: 'Choose a date to find availability'
      });
    } else if (!fields.start) {
      this.setState({
        fields: {
          ...this.state.fields,
          start: this.state.times[index].time
        }
      });
    } else if (fields.start) {
      this.setState({
        fields: {
          ...this.state.fields,
          end: this.state.times[index].time
        }
      });
    }
  };

  nextHandler = () => {
    const { name, reason } = this.state.fields;
    if (!name || !reason) {
      this.setState({
        message: 'Fill out empty fields'
      });
    } else {
      this.setState({
        message: '',
        step: this.state.step + 1
      });
    }
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

  goToApptHandler = () => {
    this.props.history.push('/appointments');
  };

  render() {
    const { fields, step, times, message } = this.state;
    return (
      <div className="Form">
        <Inputs
          onChangeHandler={this.onChangeHandler}
          submitTime={this.submitTimeHandler}
          fields={fields}
          step={step}
          times={times}
          appt={this.props.appt}
          message={message}
          nextHandler={this.nextHandler}
          backHandler={this.backHandler}
          submitHandler={this.submitHandler}
          resetHandler={this.resetHandler}
          goToApptHandler={this.goToApptHandler}
        />
      </div>
    );
  }
}

export default Form;
