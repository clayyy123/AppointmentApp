const express = require('express');
const server = express();
const logger = require('morgan');
const mongoose = require('mongoose');
const PORT = 3001;
const userRoutes = require('./Routes/users');
const apptRoutes = require('./Routes/appointments');
const connectionString = 'mongodb://localhost/appts';
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(connectionString, { useNewUrlParser: true }, err => {
  console.log(err || 'connected to mongodb');
});

server.use(logger('dev'));
server.use(express.json());
server.use('/users', userRoutes);
server.use('/appointments', apptRoutes);

server.listen(PORT, err => {
  console.log(`server listening on PORT ${PORT}`);
});
