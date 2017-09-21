var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
  var path = "D:/Works/";
  var data = [];
  fs.readdir(path, function(err, files){
    files.forEach( function (file){
       data.push(file);
    });
    res.render('index', { title: '文件管理器', data: data });
  })
});

module.exports = router;
