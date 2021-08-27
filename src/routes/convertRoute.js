const express = require('express');
const route = express.Router();

const convertController = require('../controllers/convertController');

route.post('/', convertController.convert);
route.post('/test', convertController.test);

module.exports = route;