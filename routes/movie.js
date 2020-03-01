const express = require('express');
const router = express.Router();
const axios = require('axios');
const publicIp = require('public-ip');
const {key, secret_key} = require('./.config.js');

router.get('/:id', async (req, res) => {
  try {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded
      ? forwarded.split(/, /)[0]
      : req.connection.remoteAddress;
    const url = await get_movie(req.params.id, ip);
    res.json({url: url});
  } catch (err) {
    console.log(err);
    res.status(400);
  }
});

const get_movie = async (videoId, ip) => {
  const ipaddress = ip; //await publicIp.v4();
  console.log(`ipaddress : ${ipaddress}`);

  const ticketUrl = `https://videospider.in/getticket.php?key=${key}&secret_key=${secret_key}&video_id=${videoId}&ip=${ipaddress}`;

  try {
    const res = await axios.get(ticketUrl);
    console.log(`ticket : ${res.data}`);
    const url = `https://videospider.stream/getvideo?key=${key}&video_id=${videoId}&ticket=${res.data}`;
    console.log(`${url}`);
    return url;
  } catch (err) {
    console.log('error', err);
  }
};

module.exports = router;
