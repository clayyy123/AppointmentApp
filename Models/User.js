const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { Type: String, required: true },
  password: { Type: String, required: true },
  email: { Type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
