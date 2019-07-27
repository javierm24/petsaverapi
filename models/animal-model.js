const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    imagen: String,
    tipo: String,
    nombre: String,
    edad: String,
    descripcion: String,
    dueno: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
 });
 
 const animalModel = mongoose.model('animal', animalSchema);

 module.exports = animalModel;