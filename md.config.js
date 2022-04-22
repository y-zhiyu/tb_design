const fs = require('fs')
const path = require('path')

function genDocStr(mdDir) {
  let data = fs.readFileSync(path.join(mdDir, `doc.md`), 'utf-8')
  data = data.replace(/\n/g, '\\n').replace(/\t/g, '\\t')
    .replace(/'/g, '\\\'')
  fs.writeFileSync(path.join(mdDir, 'doc.js'), 'const doc = \'' + data + '\'\nmodule.exports = doc\n')
}

function readDir(dir) {
  // console.log('dir------------', dir);

  const dirInfo = fs.readdirSync(dir);
  
  console.log('dirInfo----------', dirInfo)
  dirInfo.forEach(item => {
    const location = path.join(dir, item);
    const info = fs.statSync(location)
    if (info.isDirectory()) {
      readDir(location)
    } else if (location.slice(-6) === 'doc.md') {
      genDocStr(dir)
    }
  })
};

readDir(path.join(__dirname, `pages/dev`))