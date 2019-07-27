const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const bcrypt = require('bcrypt');

router.post('/usuario/registro', (req, res) => {
    try {
        let user = new userModel(
            {
                usuario: req.body.usuario,
                email: req.body.email,
                contrasena: req.body.contrasena
            });
        user.save()
        res.send("todo ok")
    } catch (error) {
        res.status(500).json({
            error: "Database error"
        })
    }
})

router.post('/usuario/login', async (req, res) => {
    try {
        const contrasena = req.body.contrasena;
        let user = await userModel.findOne({ usuario: req.body.usuario });
        if(!user){
            res.status(401).json({
                error: "No estas autorizado"
            })
        }else{
            const hash = user.contrasena;
            bcrypt.compare(contrasena, hash, (err, comp) => {
                if (err) {
                    res.status(401).json({
                        error: "Error. No estas autorizado"
                    })
                } else {
                    if (comp) {
                        res.status(200).json("todo ok");
                    } else {
                        res.status(401).json({
                            error: "No estas autorizado"
                        })
                    }
                }
            })
        }
     
    } catch (error) {
        res.status(500).json({
            error: "Database error"
        })
    }
})

module.exports = router
