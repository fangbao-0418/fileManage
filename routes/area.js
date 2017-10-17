var express = require('express');
var router = express.Router();
var http = require('http');
var debug = require('debug')('myapp');
var querystring = require('querystring');
var util = require('util');
/* GET users listing. */
router.get('/', function(req, res, next) {
  var url = "https://lsp.wuliu.taobao.com/locationservice/addr/output_address_town_array.do?l3=411329&lang=zh-S";
  var options={
    host:"lsp.wuliu.taobao.com",
    path:"/locationservice/addr/output_address_town_array.do?l3=411329&lang=zh-S",
    method:'get'
  }
  var post = '';
  reqs = http.request(options, function(req1, res1) {
    req1.on("data", function(chunk) {
      post += chunk;
      debug(chunk)
    });
    req1.on("end", function(d) {
      res.send(xxx)
    });
  });
  reqs.end();
  res.send('xxx1')
});

module.exports = router;
