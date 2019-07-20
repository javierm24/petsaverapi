const mongoose = require('mongoose');

const conversacionSchema = new mongoose.Schema({
    userID_1: mongoose.Types.ObjectId,
    userID_2: mongoose.Types.ObjectId,
    mensajes: []
 });
 
 const conversacionModel = mongoose.model('conversacion', conversacionSchema);


 module.exports = conversacionModel;