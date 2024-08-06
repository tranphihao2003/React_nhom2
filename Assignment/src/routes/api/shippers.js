const express = require("express");
const router = express.Router();
const multer = require("multer");
const authenticateToken = require("../../app/middleware/auth");
const shippers = require("../../app/api/shippers");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
})
router.get('/', authenticateToken, shippers.getAllshipperss)
router.get('/:id', authenticateToken, shippers.getshippersById)
router.post('/', authenticateToken, shippers.createshippers)
router.put('/:id', authenticateToken, shippers.updateshippers)
router.get('/backdata/all', authenticateToken, shippers.backdata) // Change to GET
router.put('/backdata/:id', authenticateToken, shippers.changeStatus) // Restore product
router.put('/stop/:id', authenticateToken, shippers.changeStatus) // Temporarily stop product
router.delete('/:id', authenticateToken, shippers.deleteshippers) // Delete product
module.exports = router
