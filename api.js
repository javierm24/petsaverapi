const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/petsavermad', { useNewUrlParser: true });
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
app.use(bodyParser.json())


const animalSchema = new mongoose.Schema({
   imagen: String,
   tipo: String,
   nombre: String,
   edad: Number,
   descripcion: String,
   dueno: mongoose.Types.ObjectId
});

const animalModel = mongoose.model('animal', animalSchema);

app.post('/animales', (req, res) => {

   let animal = new animalModel(
      {
         imagen: req.body.imagen,
         tipo: req.body.tipo,
         nombre: req.body.nombre,
         edad: req.body.edad,
         descripcion: req.body.descripcion,
         dueno: mongoose.Types.ObjectId(req.body.dueno)
      });
   animal.save()
   res.send("todo ok")
})

app.get('/animales/search/:tipo', async (req, res) => {
   let result = await animalModel.find({ tipo: req.params.tipo })
   res.send(result)
})

app.delete('/animales/:id', function (req, res) {
   animalModel.findByIdAndDelete({ _id: req.params.id }).then(function () {
      res.send('ELIMINADO')
   })
})

app.get('/animales/:dueno', async (req, res) => {
   let result = await animalModel.find({ dueno: req.params.dueno })
   res.send(result)
})



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


