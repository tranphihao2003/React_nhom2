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
router.get('/', authenticateToken, orders.getAllorderss)
router.get('/:id', authenticateToken, orders.getordersById)
router.put('/:id', authenticateToken, orders.updateorders)
router.delete('/:id', authenticateToken, orders.deleteorders)

module.exports = router
