const path = require('path');
const mapDir = require('../tools/mapDir');
let sidebar = mapDir(path.resolve(__dirname, '../public/doc'));

setInterval(() => {
  sidebar = mapDir(path.resolve(__dirname, '../public/doc'));
}, 60000);

module.exports = function (req, res) {
  res.send(sidebar);
}