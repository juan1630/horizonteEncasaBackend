const express = require('express')
const app = express()

app.use(require('./inicio'));

module.exports = app;