const request_promise = require('request-promise');
const cheerio = require("cheerio");
const express = require("express");
const router = express.Router();
router.use(express.json());

async function findNum (num) {
  let solution = num.value;
  console.log(solution);
  return solution;
}

module.exports = {
  findNum
}



