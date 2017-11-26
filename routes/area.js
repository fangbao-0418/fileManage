var express = require('express');
var router = express.Router();
var path = require('path');
var http = require('http');
var https = require('https');
var debug = require('debug')('myapp');
var querystring = require('querystring');
var util = require('util');
const fs = require('fs');
const console = require('console');
var globals = require('../globals');
/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(222);
  var url = "https://lsp.wuliu.taobao.com/locationservice/addr/output_address_town_array.do?l3=411329&lang=zh-S";
  var post = '';
  reqs = https.get(url, function(req1, res1) {
    req1.on("data", function(chunk) {
      post += chunk;
      debug(chunk)
    });
    req1.on("end", function(d) {
      var result = [];
      var data = {};
      try{
      	result = eval('(' + post.match(/^callback\((.*)\);$/)[1] + ')').result
      }catch(e){
      }
      for(var i in result){
        data[result[i][0]] = result[i][1]
      }

      var paths = path.resolve(globals.root, 'json/city.json');
      var buf = new Buffer(1024*1024);
      fs.open(paths, 'r+', (err, fd) => {
        fs.read(fd, buf, 0, buf.length, null, (err, buff, buff1) => {
          var o = {}
          if(buff > 0){
            try{
              o = eval('(' + buf.slice(0, buff).toString() + ')');
            }catch(e){

            }
          }
          console.log(o)
          res.render('area', { title: '文件管理器2', style: 'index.css', javascript: 'index.js', data: o });
        })
        // fs.write(fd, JSON.stringify(data), (err, written, str) => {
        // })
      })
      // fs.wirite()
    });
  });
  reqs.end();
  // res.render('area', { title: '文件管理器', style: 'index.css', javascript: 'index.js', data: {} });
  // setTimeout(() => {
  //   res.render('area', { title: '文件管理器', style: 'index.css', javascript: 'index.js', data: 'xxx' });
  // }, 1000)
});

module.exports = router;
