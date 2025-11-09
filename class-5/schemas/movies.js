import z from 'zod'

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Title must be a string',
    required_error: 'Title is required',
  }),
  year: z.number().int().positive().min(1900).max(2100),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.url({
    invalid_type_error: 'Poster must be a URL',
    required_error: 'Poster is required',
  }),
  genre: z.array(
    z.enum([
      'Action',
      'Adventure',
      'Comedy',
      'Crime',
      'Drama',
      'Fantasy',
      'Horror',
      'Sci-Fi',
      'Thriller',
    ]),
    {
      invalid_type_error: 'Genre must be an array of strings',
      required_error: 'Genre is required',
    },
  ),
  rate: z.number().min(0).max(10),
})

export function validateMovie(input) {
  return movieSchema.safeParse(input)
}

export function validatePartialMovie(input) {
  return movieSchema.partial().safeParse(input)
}
