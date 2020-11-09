const {Router} = require('express')
const router = Router()

router.use(require('./user'))

module.exports = router