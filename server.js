const express = require('express');
const server = express();
const logger = require('morgan');
const mongoose = require('mongoose');
const userRoutes = require('./Routes/users');
const apptRoutes = require('./Routes/appointments');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3001;
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost/appts';

mongoose.connect(connectionString, { useNewUrlParser: true }, err => {
  console.log(err || 'connected to mongodb');
});

server.use(express.static(`${__dirname}/client/build`));
server.use(logger('dev'));
server.use(express.json());
server.use('/api/users', userRoutes);
server.use('/api/appointments', apptRoutes);

server.use('*', (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`);
});

server.listen(PORT, err => {
  console.log(`server listening on PORT ${PORT}`);
});
