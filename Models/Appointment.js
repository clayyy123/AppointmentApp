const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  createdFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdBy: String,
  reason: String,
  date: String
});

const Appointment = new mongoose.model('Appointment', appointmentSchema);
// console.log(Appointment);

module.exports = Appointment;
