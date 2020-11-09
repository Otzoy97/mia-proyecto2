const { create, login, getById, update, confirm } = require('../controllers/user')
const emailService = require('../utils/nodemailer')
const express = require('express');
const { checkToken } = require('../utils/middlewares/auth');
const app = express()


app.post('/user/signup', async (req, res) => {
    let body = req.body;
    let result = await create(body)
    if (result.ok) {
        // Envía el correo de confirmación
        const baseUrl = req.protocol + "://" + req.hostname + `:3000/user/update/account-status/${result.id}`
        const data = {
            from: "S. Otzoy",
            to: body.email,
            subject: "Activación de cuenta",
            text: `Link de activación ${baseUrl}`,
            html: `<p>Link de activación <strong>${baseUrl}</strong></p>`
        }
        emailService.sendMail(data, (err, inf) => {
            if (err) {
                console.log(err)
            } else {
                console.log(inf)
            }
        })
        return res.status(200).send({ ok: true })
    } else {
        if (result.err.errorNum == 1) {
            // Correo duplicado
            return res.status(422).send(result)
        }
        // Error imprevisto
        return res.status(500).send(result)
    }
})

app.post('/user/login', async (req, res) => {
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
            return res.status(result.status).send({ ok: false })
        }
    }
})

app.get('/user/info', checkToken, async (req, res) => {
    let body = req.body
    let result = await getById(body)
    if (result.ok) {
        return res.status(200).send(result)
    }
    console.log(result.err)
    return res.status(500).json({ ok: false })
})


app.put('/user/update/info', checkToken, async (req, res) => {
    let body = req.body
    let result = await update(body)
    if (result.ok) {
        return res.status(200).send(result)
    }
    console.error(result.err)
    return res.status(500).json({ ok: false })
})

app.put('/user/update/pwd', checkToken, async (req, res) => {
    let body = req.body
    let result = await updatePwd(body)
    if (result.ok) {
        return res.status(200).send(result)
    }
    console.error(result.err)
    return res.status(500).json({ ok: false })
})


app.get('/user/update/account-status/:id', async (req, res) => {
    const id = req.params.id
    const result = await confirm(id)
    if (result.ok) {
        return res.status(200).send(result)
    }
    return res.status(500).send(result)
})

module.exports = app