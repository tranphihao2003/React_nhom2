const express = require("express");
const router = express.Router();
const multer = require("multer");
const authenticateToken = require("../../app/middleware/auth");
const account = require("../../app/api/account");
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

router.post("/login", account.login);
router.get("", authenticateToken, account.getAllaccounts);
router.get("/:id", authenticateToken, account.getAccountById);
router.post("", authenticateToken, upload.single("image"), account.createAccount);
router.put("/:id",authenticateToken, account.updateAccount);
router.delete("/:id",authenticateToken, account.deleteAccount);

router.put('/backdata/:id', authenticateToken, account.changeStatus);
router.get('/backdata/all', authenticateToken, account.backdata);
router.put('/stop/:id', authenticateToken, account.changeStatus);
module.exports = router;
