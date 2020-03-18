const express = require("express");
const service = require("./calc");
const router = express.Router();
router.use(express.json());


router.post("/", async function(req, res) {
  let num = req.body.body;
  await service.findNum(num);
  res.sendStatus(200);
});

router.get("/:page", async function(req, res) {
  let page = req.params.page;
  const base= page;
  let data = await service.parsePage(base);
  res.send({message: data});
});

module.exports = router;
