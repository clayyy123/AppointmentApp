import React, { Component } from 'react';
import Card from '../Components/Card';
import httpClient from '../httpClient';

class Profile extends Component {
  state = {
    appointments: []
  };

  async componentDidMount() {
    const { match } = this.props;
    const demAppointments = await httpClient.getAppointments(match.params.id);
    this.setState({
      appointments: demAppointments.data.times
    });
  }
  render() {
    const { appointments } = this.state;
    return (
      <div className="Appt">
        <h1 className="Appt__title">Your Appointments</h1>
        <div className="Appt__container">
          {appointments.map((a, i) => {
            return <Card key={i} a={a} />;
          })}
        </div>
      </div>
    );
  }
}

export default Profile;
