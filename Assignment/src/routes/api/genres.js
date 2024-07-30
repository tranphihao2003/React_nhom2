const express = require("express");
const router = express.Router();
const multer = require("multer");
const authenticateToken = require("../../app/middleware/auth");
const genres = require("../../app/api/genres");
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
router.get("/", authenticateToken, genres.getAllgenress);
router.get("/:id", authenticateToken, genres.getgenresById);
router.put("/:id", authenticateToken, genres.updategenres);
router.delete("/:id", authenticateToken, genres.deletegenres);

module.exports = router;