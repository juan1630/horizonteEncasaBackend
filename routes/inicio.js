var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;
const express = require('express');

const modelUsers = require('../models/users/user');

const app = express();

const { CLIENT_ID, CLIENT_SECRET } = require('../config/confi');


var fbOptions = {
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: "http://localhost:3200/auth/facebook/callback",
    // profileFields: ['emails']
    profileFields: ['id', 'displayName', 'photos', 'email']
}

const callbackFuntion = (accessToken, refreshToken, profile, done) => {
    modelUsers
        .find({ idPassport: profile.id })
        .exec()
        .then(data => {

            if (data.length >= 1) {
                return;
            } else {

                let newUser = new modelUsers({
                    nombre: profile.displayName,
                    provider: 'facebook',
                    photo: profile.photos[0].value,
                    idPassport: profile.id
                });

                newUser
                    .save()
                    .then(data => data)
                    .catch(error => error);

            }
        })
        .catch(error => console.log(error));
}

passport.use(new FacebookStrategy(fbOptions, callbackFuntion));


app.get('/', (req, resp) => {

    return resp.status(200)
        .json({
            ok: true,
            message: 'Todo bien'
        })
});

app.get('/facebook', passport.authenticate('facebook'), (req, resp) => {


    return resp.send('<h2> Hola mundo </h2>');

});

app.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, resp) => {
    resp.status(200).json({
        ok: true,
        message: 'Se creo el usuario',
    })
});


// const serveResp = (data, error, message, resp) => {

//     if (data != null) {
//         return resp.status(200)
//             .json({
//                 ok: true,
//                 message,
//                 data
//             })
//     } else if (error != null) {
//         return resp.status(500)
//             .json({
//                 ok: false,
//                 message,
//                 error
//             });
//     }

// }


module.exports = app;