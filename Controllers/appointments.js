const Appt = require('../Models/Appointment');
// console.log(Appt);
module.exports = {
  create: async (req, res) => {
    try {
      const { start, end, date, createdFor } = req.body;
      console.log(req.body);
      const times = await Appt.find({
        createdFor: createdFor._id,
        date: date
      });
      console.log(times);
      //if users were to submit times on the same date around the same time.. check to see if they overlap
      for (let i = 0; i < times.length; i++) {
        const sum = end - start + (times[i].end - times[i].start);
        const maxMin =
          Math.max(end, times[i].end) - Math.min(start, times[i].start);
        if (maxMin < sum) {
          return res.json({
            bookedTime: times[i],
            message: 'time was booked while you were booking',
            success: false
          });
        }
      }
      const createdAppt = await Appt.create(req.body);
      return res.json({ createdAppt, success: true });
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
};
