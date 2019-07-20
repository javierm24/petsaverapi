
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
        res.send("todo ok")
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

router.get('/chat/:chatid/mensaje', (req, res) => {

})

router.get('/chat/list/:userid', (req, res) => {

})

module.exports = router
