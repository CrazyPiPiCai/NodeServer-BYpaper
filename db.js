﻿// JavaScript source code
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
  selectLast: function(req, res, sheet_name) {
    pool.getConnection(function(err, con) {
      if (err) throw err;
      con.query(`SELECT * FROM ${sheet_name} WHERE id=(SELECT max(id) FROM ${sheet_name})`, function(err, result) {
        return res.jsonp(result);
      });
      con.release();
    });
  },
  secondDropdown: function(req, res, sheet_name, filter) {
    pool.getConnection(function(err, con) {
      if (err) throw err;
      con.query(
        `SELECT dataSource FROM ${sheet_name} t1 WHERE t1.ship='${filter}'`,
        function(err, result) {
          return res.jsonp(result);
        }
      );
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
  textToCompletion: function(req, res) {
    pool.getConnection(function(err, con) {
      if (err) throw err;
      con.query(
        `UPDATE completionFeedback 
               SET evaluate = CASE ID 
                   WHEN 1 THEN '${req.body.data1}'
                   WHEN 2 THEN '${req.body.data2}'
                   WHEN 3 THEN '${req.body.data3}'
                   WHEN 4 THEN '${req.body.data4}'
               END
           WHERE ID IN (1,2,3,4);`,
        function(err, results) {
          return res.send("提交成功！");
        }
      );
      con.release();
    });
  },
  imageToQuality: function(fields, fileUrl) {
    pool.getConnection(function(err, con) {
      if (err) throw err;
      con.query(
        `UPDATE qualityFeedback 
               SET data = CASE ID 
                   WHEN 1 THEN '${fields.data1}'
                   WHEN 2 THEN '${fields.data2}'
                   WHEN 3 THEN '${fields.data3}'
                   WHEN 4 THEN '${fields.data4}'
                   WHEN 5 THEN '${fileUrl}'
               END
           WHERE ID IN (1,2,3,4,5);`,
        function(err, results) {
          if (err) throw err;
        }
      );
      con.release();
    });
  },
  textToCompletionPlus: function(req, res) {
    pool.getConnection(function(err, con) {
      if (err) throw err;
      con.query(
        `INSERT INTO completionFeedback_data(one,two,three,four,five,six) VALUES('${
          req.body.data1
        }','${req.body.data2}','${req.body.data3}','${req.body.data4}','${req.body.data5}','${req.body.data6}')`,
        function(err, results) {
          return res.send("提交成功！");
        }
      );
      con.release();
    });
  },
  imageToQualityPlus: function(fields, fileUrl) {
    pool.getConnection(function(err, con) {
      if (err) throw err;
      con.query(
        `INSERT INTO qulityFeedback_data(ship,section,time,people,photo) VALUES('${
          fields.data1
        }','${fields.data2}','${fields.data3}','${fields.data4}','${fileUrl}')`,
        function(err, results) {
          if (err) throw err;
        }
      );
      con.release();
    });
  },
  request: function(req,res,quest) {
    pool.getConnection(function(err, con) {
      if (err) throw err;
      con.query(`SELECT * FROM qulityFeedback_data WHERE concat(ship,section,time,people,photo) like '%${quest}%'`, function(err, result) {
        return res.jsonp(result);
      });
      con.release();
    });
  },
  searchPhoto: function(req,res,ship,section,time) {
    pool.getConnection(function(err, con) {
      if (err) throw err;
      var sql = 'SELECT photo FROM qulityFeedback_data WHERE 1=1';
      if(ship!=''){
        sql = sql + ' AND ship=' + `'${ship}'`;
      }
      if(section!=''){
        sql = sql + ' AND section=' + `'${section}'`;
      }
      if(time!=''){
        sql = sql + ' AND time=' + `'${time}'`;
      }
      con.query(sql, function(err, result) {
        return res.jsonp(result);
      });
      con.release();
    });
  },
};

exports = module.exports = DB;
