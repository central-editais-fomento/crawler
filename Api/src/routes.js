const express = require('express');
const routes = express.Router();

const FileController = require('./controller/FileController');
const ErrorController = require('./controller/ErrorController');


routes.post('/file',FileController.store);
routes.post('/errors',ErrorController.store);




module.exports = routes;