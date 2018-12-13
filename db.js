// JavaScript source code
"use strict";

const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "fy121212",
  database: "app_BYpaper"
});

const DB = {
  select: function(req, res, sheet_name) {
    pool.getConnection(function(err, con) {
      if (err) throw err;
      con.query(`SELECT * FROM ${sheet_name}`, function(err, result) {
        return res.jsonp(result);
      });
      con.release();
    });
  },
  col: function(req, res, table_name) {
    pool.getConnection(function(err, con) {
      if (err) throw err;
      con.query(
        `select COLUMN_NAME from information_schema.COLUMNS where table_name = '${table_name}' and table_schema = 'app_BYpaper'`,
        function(err, result) {
          return res.jsonp(result);
        }
      );
      con.release();
    });
  },
  postToCompletion: function(req, res) {
    pool.getConnection(function(err, con) {
      if (err) throw err;
      con.query(
          `UPDATE qualityFeedback 
               SET textData = CASE ID 
                   WHEN 1 THEN '${req.body.data1}'
                   WHEN 2 THEN '${req.body.data2}'
                   WHEN 3 THEN '${req.body.data3}'
                   WHEN 4 THEN '${req.body.data4}'
               END
           WHERE ID IN (1,2,3,4);`, function(err, results) {
        return res.send('ok');
      });
      con.release();
    });
  }
};

exports = module.exports = DB;
