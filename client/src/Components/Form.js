import React, { Component } from 'react';
import Inputs from './Inputs';
import { Redirect } from 'react-router-dom';
import httpClient from '../httpClient';

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
        appointments: demAppointments.data.times.sort(
          (a, b) => a.start - b.start
        )
      });
    }
  }

  onChangeHandler = e => {
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
      //if creating appt is success, set state and move on
      if (createdAppt.data.success) {
        this.setState({
          fields: {
            createdBy: '',
            reason: '',
            date: ''
          },
          step: this.state.step + 1,
          message: '',
          appointments: [...this.state.appointments, obj].sort(
            (a, b) => a.start - b.start
          )
        });
      } else {
        // if it doesnt because someone booked the time already, notify and push the booked appnt into array.
        this.setState({
          fields: {
            ...this.state.fields,
            start: '',
            end: ''
          },
          message: 'Someone booked this time while you were booking!',
          appointments: [
            ...this.state.appointments,
            createdAppt.data.bookedTime
          ].sort((a, b) => a.start - b.start)
        });
      }
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
    this.props.history.push('/users');
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
    return (
      <div className="Form">
        {!bookedUser && <Redirect to="/users" />}

        <h1>
          {step === 3 ? 'Thanks for booking with' : 'You are booking with'}{' '}
          {bookedUser && bookedUser.name}
        </h1>
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
          resetHandler={this.resetHandler}
          resetTimesHandler={this.resetTimesHandler}
        />
      </div>
    );
  }
}

export default Form;
