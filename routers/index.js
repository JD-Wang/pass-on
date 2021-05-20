
// https://github.com/ZijianHe/koa-router#readme
const router = require('koa-router')()

const save = require('../controllers/save')


router.use('/api', save.routes(), save.allowedMethods())

module.exports = router