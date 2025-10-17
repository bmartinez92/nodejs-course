const { readFile } = require('node:fs/promises')

//IIFE (Immediately Invoked Function Expression)
;(async () => {
  console.log('Reading file...')
  const text = await readFile('./archive.txt', 'utf-8')
  console.log(text)

  console.log('Reading file 2...')
  const text2 = await readFile('./archive2.txt', 'utf-8')
  console.log(text2)
})()
