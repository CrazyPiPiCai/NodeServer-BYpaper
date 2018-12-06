const express = require("express");
const DB = require("./db");
const router = express.Router();

router.get("/all", (req, res) => {
  //DB.start(req,res);
  res.send('测试OK');
});

router.get("/select", (req, res) => {
  const sheet_name = req.query.sheet_name;
  DB.App(req,res,sheet_name);
});

module.exports = router;
