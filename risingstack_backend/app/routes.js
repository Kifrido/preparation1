const express = require('express');
const index = require('./index');
const cors = require('cors');
const app = express();
app.use(cors());

app.use('/scrape', index);

module.exports = app;