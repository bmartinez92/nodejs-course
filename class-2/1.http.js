const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  if (req.url === '/') {
    res.end('Welcome to the homepage\n')
  } else if (req.url === '/about.png') {
    fs.readFile('./class-2/picachu.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('500 Internal Server Error\n')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/contact') {
    res.end('Welcome to the contact page\n')
  } else {
    res.statusCode = 404
    res.end('404 Not Found\n')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log('Server running at http://localhost:%d/', desiredPort)
})
