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

router.put('/backdata/:id', authenticateToken, suppliers.changeStatus) // đổi trạng thái khôi phục
router.get('/backdata/all', authenticateToken, suppliers.backdata) // lấy dữ liệu đã xóa
router.put('/stop/:id', authenticateToken, suppliers.changeStatus) // Tạm dừng
module.exports = router
