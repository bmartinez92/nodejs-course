const fs = require('node:fs')

const stast = fs.statSync('./archive.txt')
console.log(
  stast.isFile(),
  stast.isDirectory(),
  stast.isSymbolicLink(),
  stast.size,
)
