// JavaScript source code
"use strict";

var mysql = require("mysql");

var pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: 'fy121212', 
    database: 'app_BYpaper'
});

var DB = {
  'select': function(req,res,sheet_name) {
    pool.getConnection(function(err, con) {
        if (err) throw err;
        con.query(`SELECT * FROM ${sheet_name}`, function(err, result) {
            return res.jsonp(result);
        });
        con.release();
      });
  },
  'col': function(req,res,table_name) {
    pool.getConnection(function(err, con) {
        if (err) throw err;
        con.query(`select COLUMN_NAME from information_schema.COLUMNS where table_name = '${table_name}' and table_schema = 'app_BYpaper'`, function(err, result) {
            return res.jsonp(result);
        });
        con.release();
      });
  }
};

exports = module.exports = DB;
