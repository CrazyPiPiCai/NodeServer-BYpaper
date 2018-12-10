const express = require("express");
const multipart = require('connect-multiparty');
const DB = require("./db");

const router = express.Router();
const multipartMiddleware = multipart();

router.get("/select", (req, res) => {
  const sheet_name = req.query.sheet_name;
  DB.select(req,res,sheet_name);
});

router.get("/selectColName", (req, res) => {
  const table_name = req.query.table_name;
  DB.col(req,res,table_name);
});

router.post('/formdata', multipartMiddleware, (req, res) => {
  res.send(req.body);
});

module.exports = router;
