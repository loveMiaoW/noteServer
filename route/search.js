const match = require('../tools/match');
module.exports = async function (req, res) {
  const { key } = req.query;
  let test = await match(key);
  res.send(test);
}