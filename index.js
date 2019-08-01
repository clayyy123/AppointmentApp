const express = require('express');
const server = express();
const logger = require('morgan');
const PORT = 3000;

server.use(logger('dev'));

server.listen(PORT, err => {
  console.log(`server listening on PORT ${PORT}`);
});
