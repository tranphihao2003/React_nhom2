const express = require("express");
const router = express.Router();
const multer = require("multer");
const products = require("../../app/api/products");
const authenticateToken = require("../../app/middleware/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", authenticateToken, products.getAllproductss);
router.get("/listadd", authenticateToken, products.getAllProductAdd);
router.get("/:id", authenticateToken, products.getproductsById);
router.post("/", authenticateToken, upload.single("image"), products.createproducts);
router.put("/:id", authenticateToken, products.updateproducts);
router.delete("/:id", authenticateToken, products.deleteproducts);

module.exports = router;
