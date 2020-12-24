const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let userSchema = new Schema({

    nombre: { type: String },
    edad: { type: String },
    direccion: { type: String },
    genero: { type: String },
    password: { type: String },
    telefono: { type: String },
    correo: { type: String },
    // datos generales 

    fumador: { type: String },
    alcholico: { type: String },

    // medicos 

    provider: { type: String },
    referencias: { type: String },
    photo: { type: String },
    idPassport: { type: String },

    // perfil 

    registro: { type: Date, default: Date.now() },

});


module.exports = mongoose.model('modelUsers', userSchema);