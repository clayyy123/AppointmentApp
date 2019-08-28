import React, { Component } from 'react';
import Inputs from './Inputs';
import { Redirect } from 'react-router-dom';
import httpClient from '../httpClient';
import { create } from 'domain';

class Form extends Component {
  state = {
    fields: {
      createdBy: '',
      reason: '',
      date: '',
      createdFor: null,
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
    ],
    appointments: []
  };

  async componentDidMount() {
    const { bookedUser } = this.props;
    if (this.props.bookedUser) {
      const demAppointments = await httpClient.getAppointments(bookedUser._id);
      this.setState({
        appointments: demAppointments.data.times
      });
    }
  }

  onChangeHandler = e => {
    console.log(e.target.name);
    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value,
        start: e.target.name === 'date' ? '' : this.state.fields.start,
        end: e.target.name === 'date' ? '' : this.state.fields.end
      },
      message: ''
    });
  };

  submitHandler = async app => {
    const { fields } = this.state;
    if (!fields.date || !fields.start || !fields.end) {
      this.setState({
        message: 'Date and Times must be filled'
      });
    } else {
      const obj = { ...fields };
      obj.createdFor = this.props.bookedUser;
      const createdAppt = await httpClient.createAppointment(obj);
      this.setState({
        fields: {
          createdBy: '',
          reason: '',
          date: ''
        },
        step: this.state.step + 1,
        message: '',
        appointments: [...this.state.appointments, obj]
      });
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
    const { createdBy, reason } = this.state.fields;
    if (!createdBy || !reason) {
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

  resetTimesHandler = () => {
    this.setState({
      fields: {
        ...this.state.fields,
        start: '',
        end: ''
      }
    });
  };

  render() {
    const { fields, step, times, message, appointments } = this.state;
    const { bookedUser } = this.props;
    console.log(this.state.fields);
    return (
      <div className="Form">
        {!bookedUser && <Redirect to="/users" />}
        <h1>You are booking with {bookedUser && bookedUser.name}</h1>
        <Inputs
          onChangeHandler={this.onChangeHandler}
          submitTime={this.submitTimeHandler}
          fields={fields}
          step={step}
          times={times}
          appt={appointments}
          message={message}
          nextHandler={this.nextHandler}
          backHandler={this.backHandler}
          submitHandler={this.submitHandler}
          goToApptHandler={this.goToApptHandler}
          resetHandler={this.resetHandler}
          resetTimesHandler={this.resetTimesHandler}
        />
      </div>
    );
  }
}

export default Form;
