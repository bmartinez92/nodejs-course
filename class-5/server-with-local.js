import { createApp } from './app.js'
import { MovieModel } from './models/local-file-systems/movie.js'

createApp({ movieModel: MovieModel })
