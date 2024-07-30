const express = require("express");
const router = express.Router();
const multer = require("multer");
const authenticateToken = require("../../app/middleware/auth");
const stores = require("../../app/api/stores");
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
router.get("/", authenticateToken, stores.getAllstoress);
router.get("/:id", authenticateToken, stores.getstoresById);
router.post("/", authenticateToken, stores.createstores);
router.put("/:id", authenticateToken, stores.updatestores);
router.delete("/:id", authenticateToken, stores.deletestores);
router.put('/backdata/:id', authenticateToken, stores.changeStatus);
router.get('/backdata/all', authenticateToken, stores.backdata);
router.put('/stop/:id', authenticateToken, stores.changeStatus);
module.exports = router;
