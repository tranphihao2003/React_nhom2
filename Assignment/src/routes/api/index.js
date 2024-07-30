const express = require("express");
const router = express.Router();
const multer = require("multer");

const accounts = require("./accounts");
const customers = require("./customers");
const employees = require("./employees");
const orders = require("./orders");
const order_details = require("./order_details");
const products = require("./products");
const shippers = require("./shippers");
const suppliers = require("./suppliers");
const genres = require("./genres");
const store_products = require("./store_products");
const store = require("./stores");

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
router.use("/accounts", accounts);
router.use("/customers", customers);
router.use("/employees", employees);
router.use("/orders", orders);
router.use("/products", products);
router.use("/shippers", shippers);
router.use("/suppliers", suppliers);
router.use("/genres", genres);
router.use("/store_products", store_products);
router.use("/store", store);
router.use("/order_details", order_details);

module.exports = router;
