const express = require('express');
const modelUsers = require('../../models/users/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const app = express();


app.post('/registro/usuario', (req, resp) => {

    let body = req.body;


    let newUser = new modelUsers({

        nombre: body.nombre,
        edad: body.edad,
        direccion: body.direccion,
        genero: body.genero,
        password: bcrypt.hashSync(body.password, 10),
        telefono: body.telefono,
        // fumador: body.fumador,
        // alcholico: body.alcholico,
        correo: body.correo
    });


    newUser
        .save()
        .then(data => serveResp(data, null, 'Se creo el nuevo usuario', resp))
        .catch(error => serveResp(null, error, 'No se pudo crear el uaurio', resp));


});



app.post('/login', (req, resp) => {


    let body = req.body;

    modelUsers
        .findOne({ correo: body.correo })
        .exec()
        .then(data => {

            if (!bcrypt.compareSync(body.password, data.password)) {
                return resp.status(400)
                    .json({
                        ok: false,
                        message: 'Las credenciales no coinicden',
                    });
            } else {


                let token = jwt.sign({
                    nombre: data.nombre,
                    id: data._id,
                    correo: data.correo,

                }, process.env.SEED, { expiresIn: process.env.CADUCIDADTOKEN })

                data.password = 'xD';


                return resp.status(200)
                    .json({
                        ok: true,
                        message: "Credenciales correctas",
                        user: data,
                        token
                    });

            }
        })
        .catch(error => serveResp(null, error, 'No se encontro el usuario', resp));



});



const serveResp = (data, error, message, resp) => {

    if (data != null) {
        return resp.status(200)
            .json({
                ok: true,
                message,
                data
            })
    } else if (error != null) {
        return resp.status(500)
            .json({
                ok: false,
                message,
                error
            });
    }

}

module.exports = app;