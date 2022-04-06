const fs = require('fs');

// 递归获取文件列表
function getDir(dir, result) {
  result = result || [];
  let fileList = fs.readdirSync(dir);
  for (file of fileList) {
    let stats = fs.statSync(dir + '/' + file);
    if (stats.isDirectory()) {
      getDir(dir + '/' + file, result);
    } else if (stats.isFile() && file.slice(-3) == '.md') {
      result.push(dir + '/' + file);
    }
  }

  return result;
}

// 正则处理
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


// 匹配 key，返回预定的接口
// interface SearchResult {
//     title: string
//     link: string
//     label: string?
//     description: string?
//   }
module.exports = async function match(key) {
  // 调 getDir 拿到文件列表
  let fileList = getDir('route/noteServer/public/doc', []);
  // 正则

  let regexp = new RegExp(`.{0,}${escapeRegex(key)}.{0,}`, 'i');
  // 储存返回的结果
  let result = []

  // 遍历文件列表，同步读文件匹配
  for (file of fileList) {
    let find = regexp.exec(await fs.readFileSync(file));
    if (find) {
      // 取到文件名最后三个部分
      let middleTemp = file && file.replace(/route\/noteServer\/public\//g, '').split('/');

      if (middleTemp && middleTemp.length == 3) {
        // 一级目录下的 md 处理
        var filenameObj = {
          father: middleTemp[1],
          child: middleTemp[2],
          link: '/' + middleTemp[0] + '/' + middleTemp[1] + '/' + middleTemp[2]
        }
      } else {
        // 根目录的 md 处理
        var filenameObj = {
          father: null,
          child: file && '/' + file.replace(/route\/noteServer\/public\/doc\//g, ''),
          link: file.replace(/route\/noteServer\/public\//g, ''),
        }
      }
      // 最多返回 16 条
      if (result.length >= 16) {
        return result;
      }
      result.push({
        title: filenameObj.father,
        link: filenameObj.link,
        label: filenameObj.child,
        description: find
      });
    }
  }
  return result;
}
