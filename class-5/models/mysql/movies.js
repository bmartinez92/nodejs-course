import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'root',
  database: 'movies-database',
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const genreName = genre.toLowerCase()

      const [rows] = await connection.query(
        'SELECT id FROM genre WHERE LOWER(name) = ?',
        [genreName],
      )

      if (rows.length === 0) {
        return []
      }

      const genreId = rows[0].id

      const [movies] = await connection.query(
        `SELECT 
        BIN_TO_UUID(m.id) AS id,
        m.title,
        m.year,
        m.director,
        m.duration,
        m.poster,
        m.rate
      FROM movies m
      INNER JOIN movie_genres mg ON m.id = mg.movie_id
      WHERE mg.genre_id = ?`,
        [genreId],
      )

      return movies
    }

    const [movies] = await connection.query(
      `SELECT 
      BIN_TO_UUID(id) AS id,
      title,
      year,
      director,
      duration,
      poster,
      rate
    FROM movies`,
    )
    return movies
  }

  static async getById({ id }) {
    const [movies] = await connection.query(
      `SELECT 
      BIN_TO_UUID(id) AS id,
      title,
      year,
      director,
      duration,
      poster,
      rate
    FROM movies WHERE BIN_TO_UUID(id) = ?`,
      [id],
    )
    return movies[0]
  }

  static async create({ input }) {
    const [uuidResult] = await connection.query('SELECT UUID() AS uuid;')
    const uuid = uuidResult[0].uuid

    try {
      await connection.query(
        `INSERT INTO movies (id, title, year, director, duration, poster, rate) 
       VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?)`,
        [
          uuid,
          input.title,
          input.year,
          input.director,
          input.duration,
          input.poster,
          input.rate,
        ],
      )

      const [movies] = await connection.query(
        `SELECT 
        BIN_TO_UUID(id) AS id,
        title,
        year,
        director,
        duration,
        poster,
        rate
       FROM movies
       WHERE id = UUID_TO_BIN(?)`,
        [uuid],
      )

      return movies[0]
    } catch (error) {
      console.error('Error inserting movie:', error)
      throw new Error('Error creating movie')
    }
  }

  static async delete({ id }) {
    const [result] = await connection.query(
      'DELETE FROM movies WHERE id = UUID_TO_BIN(?)',
      [id],
    )

    return result.affectedRows > 0
  }

  static async update({ id, input }) {
    if (!input || Object.keys(input).length === 0) {
      throw new Error('No fields provided to update')
    }
    const fields = []
    const values = []

    for (const [key, value] of Object.entries(input)) {
      fields.push(`${key} = ?`)
      values.push(value)
    }

    values.push(id)

    const sql = `
    UPDATE movies
    SET ${fields.join(', ')}
    WHERE id = UUID_TO_BIN(?)
  `

    try {
      const [result] = await connection.query(sql, values)

      if (result.affectedRows === 0) {
        return null
      }

      const [movies] = await connection.query(
        `SELECT 
        BIN_TO_UUID(id) AS id,
        title,
        year,
        director,
        duration,
        poster,
        rate
       FROM movies
       WHERE id = UUID_TO_BIN(?)`,
        [id],
      )

      return movies[0]
    } catch (error) {
      console.error('Error updating movie:', error)
      throw new Error('Error updating movie')
    }
  }
}
