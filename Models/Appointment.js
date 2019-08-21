const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  createdFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdBy: String,
  reason: String,
  date: String,
  start: String,
  end: String
});

const Appointment = new mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
