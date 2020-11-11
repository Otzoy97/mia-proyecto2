const jwt = require('jsonwebtoken')

function checkToken(req, res, next){
    let token = req.get('token')
    jwt.verify(token, 'seed-de-dessarollo-miap2', (err, dec) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                msg: 'Token inválido'
            })
        }
        req.body.id = dec.id
        req.body.esAdmin = dec.esAdmin
        next()
    })
}

function isAdmin(req, res, next) {
    if(req.body.esAdmin) {
        next()
        return;
    }
    res.status(401).json({
        ok: false,
        msg: 'No es administrador'
    })
}

module.exports = {
    checkToken,
    isAdmin
}