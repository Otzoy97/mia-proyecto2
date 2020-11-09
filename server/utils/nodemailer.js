const nodemailer = require('nodemailer')
const secret = require('./secret')

const emailService = nodemailer.createTransport({
    service: 'gmail',
    auth: secret
})

module.exports = emailService