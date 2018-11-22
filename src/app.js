const express = require('express');
const helmet = require('helmet');

const seasonApi = require('./api/season-api');

const app = express();

app.use(helmet());

app.use('/season-data', seasonApi());

module.exports = app;
