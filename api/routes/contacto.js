const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection/connection');

router.post('/', (req, res) => {  
    const { nombre, apellido, email, telefono, asunto, mensaje } = req.body;

    if (!nombre || !apellido || !email || !asunto || !mensaje) {
        return res.status(400).json({ ok: false, mensaje: 'Faltan campos obligatorios' });
    }

    mysqlConnection.query(
        'INSERT INTO MensajesContacto (nombre, apellido, email, telefono, asunto, mensaje) VALUES (?, ?, ?, ?, ?, ?)',
        [nombre, apellido, email, telefono || null, asunto, mensaje],
        (err, results) => {
            if (!err) {
                res.status(201).json({ ok: true, mensaje: 'Mensaje enviado correctamente' });
            } else {
                console.error(err);
                res.status(500).json({ ok: false, mensaje: 'Error al registrar el mensaje' });
            }
        }
    );
});

module.exports = router;