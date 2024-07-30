const express = require('express')
const router = express.Router()
const multer = require('multer')
const authenticateToken = require('../../app/middleware/auth')
const order_details = require('../../app/api/order_details')
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
router.get('/', authenticateToken, order_details.getAllorder_detailss)
router.get('/:id', authenticateToken, order_details.getorder_detailsById)

router.put('/:id', authenticateToken, order_details.updateorder_details)
router.delete('/:id', authenticateToken, order_details.deleteorder_details)

module.exports = router
