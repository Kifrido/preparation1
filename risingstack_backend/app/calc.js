const request = require('request-promise');
const cheerio = require("cheerio");
const express = require("express");
const router = express.Router();
router.use(express.json());

async function findNum (num) {
  let solution = num.value;
  return solution;
}

async function parsePage(page) {
  try {
    console.log(page);

    for(let i =1; i <= page; i++) {
      base = `https://blog.risingstack.com/page/${i}`;
      let mainHtml = await request(base);
      $ = cheerio.load(mainHtml);

    const links = $(".post-title a");
    const urlFinder = $(links).map(function(i, link) {
      let href = $(link).attr("href");
      let newUrl = `https://blog.risingstack.com${href}`;
      return {
        url: newUrl
      }
    }).get();

    const data = await Promise.all(urlFinder.map(async (article) => {
      try {
        const articleHtml = await request(article.url);
        $ = cheerio.load(articleHtml);
        
                const titles = $("article");
                const headers = $(titles)
                  .find("h1, h2, h3, h4")
                  .map(function(i, title) {
                    return $(title).text();
                  }).get();

                  return {
                    headers
                  }

      } catch (error) {
        return error.message;
      }
    }));
    
    return data;
  }
  } catch (error){
    console.log("error: " + error);
  }

}


module.exports = {
  findNum,
  parsePage
}



