const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/petsavermad', { useNewUrlParser: true });
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const animalsRouter = require("./controllers/animals");
app.use(bodyParser.json())

const registroSchema = new mongoose.Schema({
   usuario: String,
   email: String,
   contrasena: String
});

registroSchema.pre('save', function (next) {
   bcrypt.genSalt(10).then(salts => {
      bcrypt.hash(this.contrasena, salts).then(hash => {
         this.contrasena = hash;
         next()
      })
   }).catch(error => next(error))
})

app.use('/', animalsRouter);

const registroModel = mongoose.model('registro', registroSchema);

app.post('/usuario/registro', (req, res) => {

   let registro = new registroModel(
      {
         usuario: req.body.usuario,
         email: req.body.email,
         contrasena: req.body.contrasena
      });
   registro.save()
   res.send("todo ok")
})





app.listen(3333, () => {
   console.log("3333");
})


