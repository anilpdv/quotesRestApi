const express = require("express");
const router = express.Router();
const axios = require("axios");
const publicIp = require("public-ip");
const { key, secret_key } = require("./.config.js");
const requestIp = require("request-ip");

router.get("/:id", async (req, res) => {
  try {
    const ip = req.query.ip;
    const url = await get_movie(req.params.id, ip);
    res.json({ url: url, ip });
  } catch (err) {
    console.log(err);
    res.status(400);
  }
});

const get_movie = async (videoId, ipaddress) => {
  console.log(`ipaddress  ${ipaddress}`);

  const ticketUrl = `https://videospider.in/getticket.php?key=${key}&secret_key=${secret_key}&video_id=${videoId}&ip=${ipaddress}`;

  try {
    const res = await axios.get(ticketUrl);
    console.log(`ticket : ${res.data}`);
    const url = `https://videospider.stream/getvideo?key=${key}&video_id=${videoId}&ticket=${res.data}`;
    console.log(`${url}`);
    return url;
  } catch (err) {
    console.log("error", err);
  }
};

module.exports = router;
