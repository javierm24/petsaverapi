const express = require("express");
const router = express.Router();
const animalModel = require("../models/animal-model");
const mongoose = require("mongoose");

router.post('/animales', (req, res) => {    
    try {
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
        res.status(200).json(animal)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error"
        })
    }
})

router.get('/animales/search/:tipo', async (req, res) => {
    try {
        let result = await animalModel.find({ tipo: req.params.tipo })
        res.send(result)
    } catch (err) {
        res.status(500).json({
            error: "Database error"
        })
    }
})

router.delete('/animales/:id', async (req, res) => {
    await animalModel.findByIdAndDelete({ _id: req.params.id })
    res.send('ELIMINADO')
})

router.get('/animales/:dueno', async (req, res) => {
    let result = await animalModel.find({ dueno: req.params.dueno })
    res.send(result)
})

router.get('/animales', async (req, res) => {
    let result = await animalModel.find({ })
    res.send(result)
})

module.exports = router;