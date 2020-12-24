const express = require('express');
const modelUsers = require('../../models/users/user');
const bcrypt = require('bcryptjs');

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