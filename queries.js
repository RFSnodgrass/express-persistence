const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'persistence',
  password: 'password',
  port: 5432,  
})


const getStudents = (request, response) => {
  pool.query('SELECT students.id, studentName, email, grade FROM students INNER JOIN grades ON students.id =' +
   ' grades.id ORDER BY students.id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getStudents,  
}