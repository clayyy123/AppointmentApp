const express = require('express');
const server = express();
const logger = require('morgan');
const mongoose = require('mongoose');
const PORT = 3001;
const userRoutes = require('./Routes/users');
const connectionString = 'mongodb://localhost/appts';
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(connectionString, { useNewUrlParser: true }, err => {
  console.log(err || 'connected to mongodb');
});
console.log(process.env.JWT_SECRET);

server.use(logger('dev'));
server.use(express.json());
server.use('/users', userRoutes);

server.listen(PORT, err => {
  console.log(`server listening on PORT ${PORT}`);
});
