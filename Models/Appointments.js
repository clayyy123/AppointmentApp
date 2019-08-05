const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  createdFor: {
    type: Schema.Type.ObjectId,
    ref: 'User'
  },
  createdBy: String,
  reason: String,
  date: String
});

const Appointment = new mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
