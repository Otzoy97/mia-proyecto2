const { create, login } = require('../controllers/user')
const express = require('express');
const app = express()


app.post('/user/signup', async (req, res) => {
    let body = req.body;
    result = await create(body)
    if(result.ok) {
        return res.status(200).send(JSON.stringify(result))
    } else {
        if (result.err.errorNum == 1) {
            // Correo duplicado
            return res.status(422).send(JSON.stringify(result))
        }
        // Error imprevisto
        return res.status(500).send(JSON.stringify(result))
    }
})

app.post('/user/login', async(req, res) => {
    let body = req.body
    result = await login(body)
    if (result.ok) {
        return res.status(200).send(JSON.stringify(result))
    } else {
        if (result.err) {
            // Error imprevisto
            return res.status(500).send(JSON.stringify(result))
        } else {
            // Usuario o contraseña inválidos
            return res.status(401).send(JSON.stringify(result))
        }
    }
})



module.exports = app