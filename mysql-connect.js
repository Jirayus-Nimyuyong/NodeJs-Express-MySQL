const mysql = require('mysql')
const config = require('config')

const pool = mysql.createPool({
  connectionLimit: 5,
  host: config.get('mysql.host'),
  user: config.get('mysql.user'),
  password: config.get('mysql.pass'),
  database: config.get('mysql.database')
})

pool.getConnection((err, connection) => {
  if (err) {
    console.error('error: ' + err.message)
  }
})

const connectDB = async () => {
  try {
    const sqlconnect = 'select database() AS "database", DATE_FORMAT(NOW(),"%H:%i:%S %d/%m/%Y")AS "time"'
    pool.query(sqlconnect, [true], (error, results, fields) => {
      if (error) {
        return console.error(error.message)
      }
      console.log(`Connected To The MySQL Server Database ${results[0].database} Time ${results[0].time}`)
    })
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  pool,
  connectDB
}
