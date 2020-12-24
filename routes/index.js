const express = require('express')
const app = express()

app.use(require('./inicio'));
app.use(require('./users/user'));

module.exports = app;