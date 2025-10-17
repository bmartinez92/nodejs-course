const fs = require('node:fs/promises')

console.log('Reading file...')
fs.readFile('./archive.txt', 'utf-8').then((data) => {
  console.log(data)
})

console.log('Reading file 2...')
fs.readFile('./archive2.txt', 'utf-8').then((data) => {
  console.log(data)
})
