import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

//Read JSON in ESModules (only works in Node.js >= 20.2)
// import movies from './movies.json' assert { type: 'json' }

//Read JSON in ESModules
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

//Read JSON in ESModules with require
// const movies = readJSON('./movies.json')

//method normal: GET/HEAD/POST
//method complex: PUT/PATCH/DELETE ==> CORS PRE-FLIGHT

const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

// Routes movies
app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
