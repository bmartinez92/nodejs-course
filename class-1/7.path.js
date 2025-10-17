const path = require('node:path')

//Bar separator to the current os
console.log(path.sep)

const filePath = path.join('foo', 'bar', 'baz', 'test.txt')
console.log(filePath)

const base = path.basename(filePath)
console.log(base)

const fileName = path.basename(filePath, '.txt')
console.log(fileName)

const extension = path.extname(filePath)
console.log(extension)
