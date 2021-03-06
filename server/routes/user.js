const { create, login, getById, update, updatePwd,confirm, updatePhoto, getByEmail } = require('../controllers/user')
const { checkToken } = require('../utils/middlewares/auth');
const { Router } = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')
const fs = require('fs')
const emailService = require('../utils/nodemailer');
const router = Router()

router.use(fileUpload())
router.post('/user/signup', async (req, res) => {
    let body = req.body;
    let result = await create(body)
    if (result.ok) {
        // Envía el correo de confirmación
        const baseUrl = req.protocol + "://" + req.hostname + `:4200/api/user/update/account-status/${result.id}`
        const data = {
            from: "S. Otzoy",
            to: body.email,
            subject: "Activación de cuenta",
            text: `Link de activación ${baseUrl}`,
            html: `<p>Link de activación <strong><a href="${baseUrl}">Verificar cuenta</a></strong></p>`
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

router.post('/user/login', async (req, res) => {
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

router.get('/user/info', checkToken, async (req, res) => {
    let body = req.body
    let result = await getById(body)
    let photo = path.resolve(__dirname, `../../${result.result.photo}`)
    if (result.ok) {
        return res.status(200).send(result)
    }
    console.log(result.err)
    return res.status(500).json({ ok: false })
})


router.get('/user/info/photo', checkToken, async (req, res) => {
    let body = req.body
    let result = await getById(body)
    let photo = path.resolve(__dirname, `../../${result.result.photo}`)
    if (result.ok) {
        return res.status(200).sendFile(photo)
    }
    console.log(result.err)
    return res.status(500).json({ ok: false })
})


router.put('/user/update/info', checkToken, async (req, res) => {
    let body = req.body
    let result = await update(body)
    if (result.ok) {
        return res.status(200).send(result)
    }
    console.error(result.err)
    return res.status(500).json({ ok: false })
})

router.put('/user/update/photo', checkToken, async (req, res) => {
    let body = req.body
    let file = req.files
    let photo = file.photo
    let ext = photo.name.split('.')
    ext = ext[ext.length-1]
    const ruta = `uploads/usuario/u-${body.id}`
    photo.mv(ruta, async (err)=>{
        if(err) {
            return res.status(500).send({ok: false})
        }
        let result = await updatePhoto({photo: ruta,id :body.id})
    })
    return res.status(200).send({ok:true})
})

router.put('/user/update/pwd', checkToken, async (req, res) => {
    let body = req.body
    let result = await updatePwd(body)
    if (result.ok) {
        return res.status(200).send(result)
    }
    console.error(result.err)
    return res.status(500).json({ ok: false })
})

router.put('/user/recover/pwd', async (req, res) => {
    let body = req.body
    let result = await updatePwd(body)
    if (result.ok) {
        return res.status(200).send(result)
    }
    console.error(result.err)
    return res.status(500).json({ ok: false })
})

router.get('/user/update/account-status/:id', async (req, res) => {
    const id = req.params.id
    const result = await confirm(id)
    if (result.ok) {
        return res.status(200).send(result)
    }
    return res.status(500).send(result)
})

router.post('/user/recover-pwd', async (req, res)=> {
    const body = req.body
    const result = await getByEmail(body)
    if (!result.ok) {
        return res.status(500).send({ok: false})
    }
    const baseUrl= req.protocol + "://" + req.hostname + `:4200/api/user/recover-pwd/${result.id}`
    const data = {
        from: "S. Otzoy",
        to: body.email,
        subject: "Recuperación de contraseña",
        text: `Recuperación de contraseña ${baseUrl}`,
        html: `<p>Recuperación de contraseña <strong><a href="${baseUrl}">Verificar cuenta</a></strong></p>`
    }
    emailService.sendMail(data, (err, inf) => {
        if (err) {
            console.log(err)
        } else {
            console.log(inf)
        }
    })
    return res.status(200).send({ ok: true })
})

module.exports = router