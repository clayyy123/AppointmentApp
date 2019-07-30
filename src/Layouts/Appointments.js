import React from 'react';
import Card from '../Components/Card';
import { withRouter } from 'react-router-dom';

const Appointments = ({ appt }) => {
  return (
    <div className="Appt">
      <h1 className="Appt__title">Appointments</h1>
      {appt.map((a, i) => {
        return <Card key={i} a={a} />;
      })}
    </div>
  );
};

export default withRouter(Appointments);
