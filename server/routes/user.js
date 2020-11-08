const { create, login, getById } = require('../controllers/user')
const express = require('express');
const { checkToken } = require('../middlewares/auth');
const app = express()


app.post('/user/signup', async (req, res) => {
    let body = req.body;
    let result = await create(body)
    if(result.ok) {
        return res.status(200).send(result)
    } else {
        if (result.err.errorNum == 1) {
            // Correo duplicado
            return res.status(422).send(result)
        }
        // Error imprevisto
        return res.status(500).send(result)
    }
})

app.post('/user/login', async(req, res) => {
    let body = req.body
    let result = await login(body)
    if (result.ok) {
        return res.status(200).send(result)
    } else {
        if (result.err) {
            // Error imprevisto
            return res.status(500).send(result)
        } else {
            // Usuario o contraseña inválidos
            return res.status(401).send(result)
        }
    }
})

app.get('/user/info', checkToken, async (req, res) => {
    let body = req.body
    let result = await getById(body)
    if(result.ok) {
        return res.status(200).send(result)
    }
    console.log(result.err)
    return res.status(500).json({ok: false})
})



module.exports = app