const express = require('express')
const bodyParser = require("body-parser");
const routes = require("./src/routes/index");
const multer = require("multer");
const cors = require("cors");
const app = express();
const path = require("path");
const port = 1204;
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.static("uploads"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
