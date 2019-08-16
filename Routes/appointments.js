const express = require('express');
const router = express.Router();
const apptController = require('../Controllers/appointments');

router.post('/', apptController.create);

module.exports = router;
