const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    imagen: String,
    tipo: String,
    nombre: String,
    edad: Number,
    descripcion: String,
    dueno: mongoose.Types.ObjectId
 });
 
 const animalModel = mongoose.model('animal', animalSchema);

 module.exports = animalModel;