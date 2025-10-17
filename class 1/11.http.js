const http = require('node:http')
const { findAvailablePort } = require('./12.free-port')

const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World\n')
})

findAvailablePort(desiredPort).then((port) => {
  server.listen(port)
  console.log('Server running at http://localhost:%d/', port)
})
