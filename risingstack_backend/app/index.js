const express = require('express');
//const calc = require('./calc');
const cheerio = require('cheerio');
const request = require('request');
const router = express.Router();
router.use(express.json());

router.get('/', function(req, res){
  let url = "https://blog.risingstack.com/";
  request(url, function(error, response, html) {
    if(!error) {
      $ = cheerio.load(html);
      console.log($.html('.subscribe-main-title'));
    }
    res.send($.html('.subscribe-main-title'));
  })

})

module.exports = router;