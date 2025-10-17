import { readFile } from 'node:fs/promises'

async function main() {
  console.log('Reading file...')
  const text = await readFile('./archive.txt', 'utf-8')
  console.log(text)

  console.log('Reading file 2...')
  const text2 = await readFile('./archive2.txt', 'utf-8')
  console.log(text2)
}

main()
