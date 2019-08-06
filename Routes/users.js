const express = require('express');
const router = express.Router();
const userController = require('../Controllers/users');

router.get('/', userController.index);
router.get('/profile', userController.profile);
router.post('/new', userController.create);
router.post('/', userController.authenticate);
