const express = require('express')
const router = express.Router()
const multer = require('multer')
const authenticateToken = require('../../app/middleware/auth')
const orders = require('../../app/api/orders')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const upload = multer({
  storage: storage,
})

router.get('/', authenticateToken, orders.getAllorders)
router.post('/', authenticateToken, orders.createorders)
router.get('/listdetail/:id', authenticateToken, orders.getordersById)
router.put('/:id', authenticateToken, orders.updateorders)
router.delete('/:id', authenticateToken, orders.deleteorders)

router.put('/backdata/:id', authenticateToken, orders.changeStatus)
router.get('/backdata/all', authenticateToken, orders.backdata)
router.put('/stop/:id', authenticateToken, orders.changeStatus)

module.exports = router
