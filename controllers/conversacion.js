
const express = require("express");
const router = express.Router();
const conversacionModel = require("../models/conversacion-model");

router.post('/chat/conversacion', (req, res) => {
    try {
        let conversacion = new conversacionModel(
            {
                userID_1: req.body.userID_1,
                userID_2: req.body.userID_2
            });
        conversacion.save()
        res.status(200).json("todo ok")
    } catch (error) {
        res.status(500).json({
            error: "Database error"
        })
    }
})


router.put('/chat/:conversacionId', async (req, res) => {
    try {
        const mensaje = {
            texto: req.body.mensaje,
            remitente: req.body.remitente
        }
        const conversacion = await conversacionModel.findByIdAndUpdate(req.params.conversacionId, {
            $addToSet: { mensajes: mensaje }
        }, { new: true, useFindAndModify: false })

        res.send(conversacion);
    } catch (error) {
        res.status(500).json({
            error: "Database error"
        })
    }
})

router.get('/chat/:conversacionId', async (req, res) => {
    try {
        let result = await conversacionModel.findById(req.params.conversacionId)

        res.send(result)

    } catch (error) {
        res.status(500).json({
            error: "Database error"
        })
    }
})

router.get('/chat/list/:userid', async (req, res) => {
    try {
        let lista = await conversacionModel.find({ $or: [
            { userID_1: req.params.userid },
            { userID_2: req.params.userid }
        ]})

        res.send(lista)
    } catch (error) {
        res.status(500).json({
            error: "Database error"
        })
    }

})

module.exports = router
