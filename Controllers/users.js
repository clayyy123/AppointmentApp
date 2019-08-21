const User = require('../Models/User');
const Appointment = require('../Models/Appointment');
const signToken = require('../serverAuth.js').signToken;

module.exports = {
  index: async (req, res) => {
    try {
      const allUsers = await User.find({});
      res.json({
        users: allUsers,
        success: true
      });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  },
  create: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      const token = signToken(newUser);
      res.json({
        user: newUser,
        success: true,
        token
      });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  },
  getTimes: async (req, res) => {
    try {
      const times = await Appointment.find({
        createdFor: req.params.id
      });

      res.json({
        times,
        success: true
      });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  },
  profile: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.json({
        user,
        success: true
      });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  },
  // the login route
  authenticate: async (req, res) => {
    // check if the user exists
    try {
      const loggedUser = await User.findOne({ email: req.body.email });
      // if there's no user or the password is invalid
      if (!loggedUser || !loggedUser.validPassword(req.body.password)) {
        // deny access
        return res.json({ success: false, message: 'Invalid credentials.' });
      }
      const token = signToken(loggedUser);
      res.json({ success: true, message: 'Token attached.', token });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
};
