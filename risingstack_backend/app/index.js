const express = require("express");
const service = require('./calc');
//const app = express();

/*app.get('/:ticker', (req, res) => {
  let tickerSymbol = req.params.ticker;

  service.scrapeFeedburner(tickerSymbol)
  .then(list => { return service.getArticleData(list)
  })
  res.end();
})*/

const cheerio = require("cheerio");
//const axios = require("axios");
const request = require("request");
const router = express.Router();
router.use(express.json());


router.post("/", async function(req, res) {
  let num = req.body.body;
  await service.findNum(num);
  res.sendStatus(200);
});

router.get("/:page", async function(req, res) {
  let page = req.params.page;
  let url = `https://blog.risingstack.com/page/${page}`;
  let getLinks = request(url, function(error, response, html) {
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
  res.send({ "message" : "hello" });
});

module.exports = router;
//let url = "https://blog.risingstack.com/"

/*const getWebsiteContent = async (url) => {
  try {
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)

  } catch (error) {

    console.error(error)
  }
}

getWebsiteContent(url)*/

//module.exports = app;
