const express = require('express')
const { notifyController } = require('../controllers')

const { passport } = require('../plugins/passport')

const router = express.Router()

router.post('/createNotify', passport.authenticate('jwt', { session: false }),  notifyController.createNotify)
router.delete('/:id', passport.authenticate('jwt', { session: false }),  notifyController.removeNotify)
router.get('/getNotifies',  passport.authenticate('jwt', { session: false }),  notifyController.getNotifies)
router.patch('/isReadNotify/:id',  passport.authenticate('jwt', { session: false }),  notifyController.isReadNotify)
router.delete('/deleteAllNotify', passport.authenticate('jwt', { session: false }),  notifyController.deleteAllNotifies)

module.exports = router