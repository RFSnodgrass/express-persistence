const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'persistence',
  password: 'password',
  port: 5432,  
})


const getStudents = (request, response) => {

    if(request.query.search){
        pool.query('SELECT * FROM students WHERE students.studentName LIKE $1 ORDER BY students.id ASC', [request.query.search + '%'],(error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
            })        
    }
    else{    
        pool.query('SELECT * FROM students ORDER BY students.id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
        })
    }
}

const getStudent = (request, response) => {

    const studentId = parseInt(request.params.studentId)

    pool.query('SELECT students.id, studentName, email, grade FROM students INNER JOIN grades ON students.id =' +
     ' grades.id WHERE students.id = $1', [studentId], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}


const getGrades = (request, response) => {

    const studentId = parseInt(request.params.studentId)

    pool.query('SELECT * FROM grades WHERE studentid = $1', [studentId], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const postStudentGrade = (request, response) => {
    
    const { studentid, grade } = request.body

  pool.query('INSERT INTO grades (studentid, grade) VALUES ($1, $2)', [ studentid, grade], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`grade dded with ID: ${studentid}`)
  })
}

module.exports = {
  getStudents,
  getStudent,
  getGrades,
  postStudentGrade  
}