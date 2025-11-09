import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)
moviesRouter.get('/:id', MovieController.getById)
moviesRouter.post('/', MovieController.create)
moviesRouter.patch('/:id', MovieController.update)
moviesRouter.delete('/:id', MovieController.delete)
