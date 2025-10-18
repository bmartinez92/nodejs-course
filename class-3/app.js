const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const cors = require('cors')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')

//method normal: GET/HEAD/POST
//method complex: PUT/PATCH/DELETE ==> CORS PRE-FLIGHT

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: (origin, callback) => {
      if (ACCEPTED_ORIGINS.includes(origin || !origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
  }),
)
app.disable('x-powered-by')

// app.get('/', (req, res) => {
//   res.json('Hello World!')
// })

const ACCEPTED_ORIGINS = ['http://localhost:8080', 'https://movies.com']

// GET all movies
app.get('/movies', (req, res) => {
  // const origin = req.get('origin')
  // if (ACCEPTED_ORIGINS.includes(origin || !origin)) {
  //   res.header('Access-Control-Allow-Origin', origin)
  // }

  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase()),
    )
    if (!filteredMovies.length) return res.status(404).json('Movies not found')
    res.json(filteredMovies)
  }
  res.json(movies)
})

// GET one movie
app.get('/movies/:id', (req, res) => {
  const movie = movies.find((movie) => movie.id === req.params.id)
  if (!movie) return res.status(404).json('Movie not found')
  res.json(movie)
})

// POST create movie
app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error)
    return res.status(400).json({ error: JSON.parse(result.error.message) })

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  }
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

// PATCH update movie
app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)
  console.log(result)
  if (result.error)
    return res.status(400).json({ error: JSON.parse(result.error.message) })

  const movieIndex = movies.findIndex((movie) => movie.id === req.params.id)
  if (movieIndex === -1) return res.status(404).json('Movie not found')

  movies[movieIndex] = {
    ...movies[movieIndex],
    ...result.data,
  }
  res.json(movies[movieIndex])
})

// DELETE delete movie
app.delete('/movies/:id', (req, res) => {
  // const origin = req.get('origin')
  // if (ACCEPTED_ORIGINS.includes(origin || !origin)) {
  //   res.header('Access-Control-Allow-Origin', origin)
  // }

  const movieIndex = movies.findIndex((movie) => movie.id === req.params.id)
  if (movieIndex === -1) return res.status(404).json('Movie not found')

  movies.splice(movieIndex, 1)
  res.status(204).json({ message: 'Movie deleted' })
})

//OPTIONS pre-flight
// app.options('/movies/:id', (req, res) => {
//   const origin = req.get('origin')
//   if (ACCEPTED_ORIGINS.includes(origin || !origin)) {
//     res.header('Access-Control-Allow-Origin', origin)
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
//     res.header('Access-Control-Allow-Headers', 'Content-Type')
//   }
//   res.status(204).json({ message: 'Movie deleted' })
// })

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
