const { pool } = require('../../../mysql-connect')

const createUser = (req, res) => {
  try {
    const {
      code,
      name,
      password,
      type,
      mobilePhone,
      email
    } = req.body
    const sqlAddUser = `
      INSERT INTO 
        users
          (
            users_id,
            users_code, 
            users_name, 
            password, 
            type, 
            mobile_phone_no, 
            email
          )
      VALUES(UUID_TO_BIN(UUID()), ?, ?, ?, ?, ?, ?)`
    const values = [code, name, password, type, mobilePhone, email]
    pool.query(sqlAddUser, values, (err, results, fields) => {
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

const getUser = (req, res) => {
  try {
    const sqlGetUsers = `
      SELECT
        BIN_TO_UUID(users_id),
        users_code,
        users_name,
        password,
        type,
        mobile_phone_no,
        email
      FROM 
        users`
    pool.query(sqlGetUsers, (err, results, fields) => {
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

const getUserById = (req, res) => {
  try {
    const { Id } = req.params
    const sqlGetUsers = `
      SELECT
        BIN_TO_UUID(users_id),
        users_code,
        users_name,
        password,
        type,
        mobile_phone_no,
        email
      FROM 
        users
      WHERE 
        users_code = ?`
    const value = [Id]
    pool.query(sqlGetUsers, value, (err, results, fields) => {
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

const updateUser = (req, res) => {
  try {
    const {
      params: { Id },
      body: {
        code,
        name,
        password,
        type,
        mobilePhone,
        email
      }
    } = req
    const sqlUpdate = `
      UPDATE
        users
      SET
        users_code = ?,
        users_name = ?,
        password  = ?,
        type = ?,
        mobile_phone_no = ?,
        email = ?
      WHERE
        users_code = ?`
    const values = [code, name, password, type, mobilePhone, email, Id]
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

const deleteUser = (req, res) => {
  try {
    const { Id } = req.params
    const sqlDelete = 'DELETE FROM users WHERE users_code = ?'
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
  createUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser
}
