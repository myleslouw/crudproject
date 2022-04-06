const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors());
app.use(express.json())


const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Absorberknife421',
    database: 'employeeSystem'
});

app.post('/create', (req, res) => {         //the server side post reqeust for creating an employee
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;         //data  to be sent
    const position = req.body.position;
    const wage = req.body.wage;

    db.query(
        "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
        [name, age, country, position, wage],
        (err, result) => {
          if (err) {
            console.log(err);         //if there is an error with the query it will be logged
          } else {
            res.send("Employee Added");    
          }
        }
      );
});

app.get('/employees', (req, res) => {   //server side get request for showing all the employees
  db.query('SELECT * FROM employees', 
  (err, result) => {
    if (err) {            //if there was an error it will log it 
      console.log(err);
    } else {              //if successful
        res.send(result)
    }
  })
})

app.put('/update', (req, res) => {
  const id = req.body.Id;
  const wage = req.body.wage;
  db.query('UPDATE employees SET wage = ? WHERE Id = ?', [wage, id], (err, result) => {
    if (err) {
      console.log
    } else {
      res.send(result);
    }
  })
})

app.delete('/delete/:employeeID', (req, res) => {
  const empID = req.params.employeeID;
  console.log("found iD is " + empID);

  db.query('DELETE FROM employeesystem.employees WHERE Id = ?', empID, (err, result) => {
    console.log("Server side deleting Id: " + empID)
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
})


app.listen(3001,() => {     //checks to see if the connection is there
    console.log('---*_!server running on port 3001 bro!_*---')
})