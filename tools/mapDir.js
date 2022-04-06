const fs = require('fs');
const path = require('path');

function dfs(dir, root) {
  let obj = [];
  let fileList = fs.readdirSync(dir);
  for (file of fileList) {
    let stats = fs.statSync(dir + '/' + file);
    if (stats.isDirectory()) {
      obj.push({
        title: file,
        children: dfs(dir + '/' + file, root)
      });
    } else if (stats.isFile()) {
      if (file.slice(-3) == '.md') {
        obj.push({
          title: file,
          link: dir.replace(root, '') + '/' + file
        });
      }

    }
  }
  return obj;
}

module.exports = (dir) => dfs(path.resolve(dir), path.resolve(dir))

