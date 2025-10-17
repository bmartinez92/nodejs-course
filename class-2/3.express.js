const express = require('express')
const app = express()
const dittoJSON = require('./pokemon/ditto.json')

app.disable('x-powered-by')

app.use(express.json())

//Middleware
// app.use((req, res, next) => {
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()

//   let body = ''
//   req.on('data', (chunk) => {
//     body += chunk.toString()
//   })
//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = new Date()
//     req.body = data
//     next()
//   })
// })

const PORT = process.env.PORT ?? 1234

app.get('/class-2/pokemon/ditto', (req, res) => {
  res.json(dittoJSON)
})

app.post('/class-2/pokemon', (req, res) => {
  res.json(req.body)
})

app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
