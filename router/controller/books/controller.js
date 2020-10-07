const { pool } = require('../../../mysql-connect')

const createBook = (req, res) => {
  try {
    const { code, name } = req.body
    const sqlAddBooks = `
      INSERT INTO 
        books
          (
            books_id,
            books_code,
            books_name
          )
      VALUES(UUID_TO_BIN(UUID()), ?, ?)`
    const values = [code, name]
    pool.query(sqlAddBooks, values, (err, results, fields) => {
      if (err) {
        res.status(500).json({
          status: 500,
          message: 'Error Query'
        })
        console.error(err.message)
      }
      res.status(201).json({
        status: 201,
        message: 'Created Success'
      })
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown Internal Server Error.'
    })
  }
}

const getBook = (req, res) => {
  try {
    const sqlGetBooks = `
      SELECT
        BIN_TO_UUID(books_id),
        books_code,
        books_name
      FROM 
        books`
    pool.query(sqlGetBooks, (err, results, fields) => {
      if (err) {
        res.status(500).json({
          status: 500,
          message: 'Error Query'
        })
        console.error(err.message)
      }
      res.status(200).json(results)
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown Internal Server Error.'
    })
  }
}

const getBookById = (req, res) => {
  try {
    const { Id } = req.params
    const sqlGetBooks = `
      SELECT
        BIN_TO_UUID(books_id),
        books_code,
        books_name
      FROM 
        books
      WHERE 
      books_code = ?`
    const value = [Id]
    pool.query(sqlGetBooks, value, (err, results, fields) => {
      if (err) {
        res.status(500).json({
          status: 500,
          message: 'Error Query'
        })
        console.error(err.message)
      }
      const [data] = results
      res.status(200).json(data)
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown Internal Server Error.'
    })
  }
}

const updateBook = (req, res) => {
  try {
    const {
      params: { Id },
      body: {
        code,
        name
      }
    } = req
    const sqlUpdate = `
      UPDATE
        books
      SET
        books_code = ?,
        books_name = ?
      WHERE
        books_code = ?`
    const values = [code, name, Id]
    pool.query(sqlUpdate, values, (err, results, fields) => {
      if (err) {
        res.status(500).json({
          status: 500,
          message: 'Error Query'
        })
      }
      res.status(200).json({
        status: 200,
        message: 'Updated Success'
      })
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown Internal Server Error.'
    })
  }
}

const deletBook = (req, res) => {
  try {
    const { Id } = req.params
    const sqlDelete = 'DELETE FROM books WHERE books_code = ?'
    const value = [Id]
    pool.query(sqlDelete, value, (err, results, fields) => {
      if (err) {
        res.status(500).json({
          status: 500,
          message: 'Error Query'
        })
      }
      res.status(200).json({
        status: 200,
        message: 'Deleted Success'
      })
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 500,
      message: 'Unknown Internal Server Error.'
    })
  }
}

module.exports = {
  createBook,
  getBook,
  getBookById,
  updateBook,
  deletBook
}
