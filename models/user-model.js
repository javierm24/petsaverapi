const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    usuario: String,
    email: String,
    contrasena: String
 });
 
 userSchema.pre('save', function (next) {
    bcrypt.genSalt(10).then(salts => {
       bcrypt.hash(this.contrasena, salts).then(hash => {
          this.contrasena = hash;
          next()
       })
    }).catch(error => next(error))
 })
 
 
 
 const userModel = mongoose.model('user', userSchema);

 module.exports = userModel;