const Appt = require('../Models/Appointment');
// console.log(Appt);
module.exports = {
  create: async (req, res) => {
    try {
      const createdAppt = await Appt.create(req.body);
      res.json({
        createdAppt,
        success: true
      });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
};
