//获取post参数中的文件及参数
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const DB = require("./db");

const method = {
  upload: (req, res) => {
    var form = new formidable.IncomingForm(); 
    form.uploadDir = path.dirname("./public/upload/temp/..");
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024;
    form.parse(req, (err, fields, files) => {
      if (err) throw err;
      const filePath = files.file.path;
      const fileExt = filePath.substring(filePath.lastIndexOf("."));
      if (".jpg.jpeg.png.gif".indexOf(fileExt.toLowerCase()) === -1) {
        const err = new Error("此文件类型不允许上传");
        res.json({ code: -1, message: "此文件类型不允许上传" });
      } else {
        //以当前时间戳对上传文件进行重命名
        const fileName = new Date().getTime() + fileExt;
        const targetDir = path.dirname('./public/upload/image/..')
        const targetFile = path.join(targetDir, fileName);
        fs.rename(filePath, targetFile, function(err) {
          if (err) {
            console.info(err);
            res.json({ code: -1, message: "操作失败" });
          } else {
            const fileUrl = "http://129.28.79.59:3000/upload/image/" + fileName;
            DB.imageToQualityPlus(fields,fileUrl);
            res.json({ code: 0, fileUrl: fileUrl });
          }
        });
      }
    });
  }
};

exports = module.exports = method;
