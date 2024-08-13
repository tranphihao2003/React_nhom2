const express = require("express");
const router = express.Router();
const multer = require("multer");
const authenticateToken = require("../../app/middleware/auth");
const customers = require("../../app/api/customers");
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


router.post('/', authenticateToken, upload.single('image'), customers.createcustomers)
router.put('/:id', authenticateToken, customers.updatecustomers)
router.delete('/:id', authenticateToken, customers.deletecustomers)

router.get("/", authenticateToken, customers.getAllcustomerss)
router.get("/listadd", authenticateToken, customers.getAllCustomerAdd)
router.get("/:id", authenticateToken, customers.getcustomersById)




router.get('/backdata/all', authenticateToken, customers.backdata2)
router.put('/backdata/:id', authenticateToken, customers.changeStatus2)


module.exports = router
