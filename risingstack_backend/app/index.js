const express = require("express");
//const calc = require('./calc');
const cheerio = require("cheerio");
const request = require("request");
const router = express.Router();
router.use(express.json());

router.get("/", function(req, res) {
  let url = "https://blog.risingstack.com/";
  request(url, function(error, response, html) {
    if (!error) {
      $ = cheerio.load(html);
      let links = $(".post-title a");
      $(links).each(function(i, link) {
        let href = $(link).attr("href");
        console.log($(link).text() + ": " + url + href);
      });
    } else {
      console.log(error);
    }
  });
});

module.exports = router;
