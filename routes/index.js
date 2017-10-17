var express = require('express');
var router = express.Router();
var fs = require("fs");
var debug = require('debug')('myapp');
function promise(path, filename){
  var p = new Promise(function(resolve, reject){
    var type = "位置"; // 未知
    var res = {};
    fs.stat(path, function(err, stats){
      if(stats.isFile()){
         type = '文件';
      }else if(stats.isDirectory()){
         type = '目录';
      }
      if(stats){
        res = {
          name: filename,
          type: type
        }
        resolve(res);
      }else{
        reject(err);
      }
    })
  })
  return p;
}
function allResquest(requests, cb, results){
  if(requests.length === 0){
    debug(results, 'res');
    return cb(null, results);
  }else{
    var req = requests.shift();
    req.then(function(res){
      results.push(res);
      allResquest(requests, cb, results);
    })
  }
}
/* GET home page. */
router.get('/', function(req, res, next) {
  var path = "/Users/gaoyanru/Documents/fangbao/fileManage"; // 此处输入目录
  var data = [];
  var promises = [];
  // 读取目录
  fs.readdir(path, function(err, files){
    files.forEach( function (file, index){
      var filePath = path + '/' + file;
      promises.push(promise(filePath, file))
    });

    function main(cb) {
      allResquest(promises, cb, [])
    }

    main(function(error, result){
      if(!error){
        res.render('index', { title: '文件管理器', style: 'index.css', javascript: 'index.js', data: result });
      }
    })

  })
});

module.exports = router;
