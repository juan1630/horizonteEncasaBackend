const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const passport = require('passport');

const app = express();

// configs 
const { PORT } = require('../config/confi');
const { URI } = require('../DB/index');
// el bodyparser va antes de usar las rutas

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(passport.session());
app.use(passport.initialize());

mongoose.connect(URI, { useNewUrlParser: true, useFindAndModify: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(info => console.log('Db running'))
    .catch(error => Error(error));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    next();
});


app.use(require('../routes/index'));

app.listen(PORT, () => console.log(`Example app listening on port  ${PORT} `));