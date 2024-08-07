const express = require('express')
const router = express.Router()
const multer = require('multer')
const authenticateToken = require('../../app/middleware/auth')
const employees = require('../../app/api/employees')
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

router.get('/', authenticateToken, employees.getAllemployees)
router.get('/:id', authenticateToken, employees.getemployeesById)
router.get('/listdetail/:id', authenticateToken, employees.getemployeesById)
router.post('/', authenticateToken, upload.single('image'), employees.createemployees)
router.put('/:id', authenticateToken, employees.updateemployees)
router.delete('/:id', authenticateToken, employees.deleteemployees)

router.put('/backdata/:id', authenticateToken, employees.changeStatus)
router.get('/backdata/all', authenticateToken, employees.backdata)
router.put('/stop/:id', authenticateToken, employees.changeStatus)

module.exports = router
