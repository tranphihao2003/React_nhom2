const express = require('express')
const router = express.Router()
const multer = require('multer')
const authenticateToken = require('../../app/middleware/auth')
const account = require('../../app/api/account')
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
router.get('/verify', authenticateToken, account.verify)
router.post('/login', account.login)
router.get('', authenticateToken, account.getAllaccounts)
router.get('/:id', authenticateToken, account.getAccountById)
router.post('', authenticateToken, upload.single('image'), account.createAccount)
router.put('/:id', authenticateToken, account.updateAccount)
router.delete('/:id', authenticateToken, account.deleteAccount)

module.exports = router
