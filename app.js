const express = require('express');
const logger = require('morgan');
const app = express();
require("reflect-metadata");

app.use(logger('dev'));

app.use('/news', require('./news/routes'));
//app.use('/schedule', require('./schedule/routes'));

app.get('/', (req, res) => res.send('Hello world!'));

app.listen(3000, () => console.log(`App running on port 3000`));

module.exports = app;