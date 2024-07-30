const express = require('express')
const router = express.Router()
const multer = require('multer')
const authenticateToken = require('../../app/middleware/auth')
const suppliers = require('../../app/api/suppliers')
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
router.get('/', authenticateToken, suppliers.getAllsupplierss)
router.get('/:id', authenticateToken, suppliers.getsuppliersById)
router.post('/', authenticateToken, suppliers.createsuppliers)
router.put('/:id', authenticateToken, suppliers.updatesuppliers)
router.delete('/:id', authenticateToken, suppliers.deletesuppliers)

module.exports = router
