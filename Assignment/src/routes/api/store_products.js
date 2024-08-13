const express = require("express");
const router = express.Router();
const multer = require("multer");
const authenticateToken = require("../../app/middleware/auth");
const store_products = require("../../app/api/store_products");
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
});
router.get('/', authenticateToken, store_products.getAllstore_products)
router.get('/listadd/:id', authenticateToken, store_products.getStore_product_ByID)
router.get('/listbyid', authenticateToken, store_products.getProductBy_ID)
// router.get('/:id', authenticateToken, store_products.getstore_productsById)
router.post('/', authenticateToken, store_products.createstore_products)
router.put('/:id', authenticateToken, store_products.updatestore_products)
router.delete('/:id', authenticateToken, store_products.deletestore_products)

router.put('/backdata/:id', authenticateToken, store_products.changeStatus)
router.get('/backdata/all', authenticateToken, store_products.backdata)
router.put('/stop/:id', authenticateToken, store_products.changeStatus)

router.put('/backdata/:id', authenticateToken, store_products.changeStatus);
router.get('/backdata/all', authenticateToken, store_products.backdata);
router.put('/stop/:id', authenticateToken, store_products.changeStatus);
module.exports = router;
