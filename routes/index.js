var express = require('express');
var router = express.Router();
var fs = require("fs");
var a = require('debug')('myapp');

function promise(path){
  var p = new Promise(function(resolve, reject){
    var type = "U"; // 未知
    fs.stat(currentPath, function(err, stats){
      if(stats.isFile()){
         type = 'F';
      }else if(stats.isDirectory()){
         type = 'D';
      }
      if(stats){
        resolve(type);
      }else{
        reject(err);
      }
    })
  })
  return p;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  var path = "D:/Works/";
  a(path);
  var data = [];
  fs.readdir(path, function(err, files){
    files.forEach( function (file, index){
      var currentPath = path + '/' + file;
      a(currentPath);
      promise(currentPath).then(function(res){
        a(currentPath);
        data.push({name: file, type: res});
        var i = index;
        // res.render('index', { title: '文件管理器', style: 'index.css', data: data });
      }).catch(function(err){
        a(err);
      })
      data.push({name: file, type: 'type'});

    });
    res.render('index', { title: '文件管理器', style: 'index.css', data: data });
  })
});

module.exports = router;
