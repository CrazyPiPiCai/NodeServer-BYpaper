const express = require("express");
//直接获取post请求体中的参数
const multipart = require('connect-multiparty');
const DB = require("./db");
const method = require("./method");

const router = express.Router();
const multipartMiddleware = multipart();

//信息沟通的接口
router.get("/select", (req, res) => {
  const sheet_name = req.query.sheet_name;
  DB.select(req,res,sheet_name);
});

router.get("/selectLast", (req, res) => {
  const sheet_name = req.query.sheet_name;
  console.log(sheet_name);
  DB.selectLast(req,res,sheet_name);
});

router.get("/secondDropdown", (req, res) => {
  const sheet_name = req.query.sheet_name;
  const filter = req.query.filter
  DB.secondDropdown(req,res,sheet_name,filter);
});

router.get("/selectColName", (req, res) => {
  const table_name = req.query.table_name;
  DB.col(req,res,table_name);
});

router.post('/formdata', multipartMiddleware, (req, res) => {
  DB.textToCompletionPlus(req, res);
});

router.post('/image', (req, res) => {
  method.upload(req,res);
});

module.exports = router;
