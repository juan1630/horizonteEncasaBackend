const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let userSchema = new Schema({
    nombre: { type: String },
    provider: { type: String },
    direccion: { type: String },
    referencias: { type: String },
    photo: { type: String },
    genero: { type: String },
    edad: { type: String },
    fumador: { type: String },
    alcholico: { type: String },
    registro: { type: Date, default: Date.now() },
    correo: { type: String },
    telefono: { type: String },
    idPassport: { type: String }

});


module.exports = mongoose.model('modelUsers', userSchema);