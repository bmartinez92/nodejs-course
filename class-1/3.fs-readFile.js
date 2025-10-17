const fs = require('node:fs')
// const { promisify } = require("node:util"); // promisify is a function that returns a promise

// const readFile = promisify(fs.readFile);
// console.log(readFile);

console.log('Reading file...')
fs.readFile('./archive.txt', 'utf-8', (err, data) => {
  console.log(data)
})

console.log('Reading file 2...')
fs.readFile('./archive2.txt', 'utf-8', (err, data) => {
  console.log(data)
})
