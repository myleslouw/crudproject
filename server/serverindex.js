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
  const _id = req.body.Id;
  const _name = req.body.name;
  const _age = req.body.age;
  const _country = req.body.country;
  const _position = req.body.position;
  const _wage = req.body.wage;


  db.query('UPDATE employees SET name = ?, age = ?, country = ?, position = ?, wage = ? WHERE Id = ?', [_name, _age, _country, _position, _wage, _id], (err, result) => {
    if (err) {
      console.log
    } else {
      res.send(result);
      console.log('Successful update server side!')
    }
  })
})

app.delete('/delete/:employeeID', (req, res) => {
  const empID = req.params.employeeID;

  db.query('DELETE FROM employeesystem.employees WHERE Id = ?', empID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log("deleted Server Side, Id: " + empID)
    }
  })
})


app.listen(3001, () => {     //checks to see if the connection is there
  console.log('---*_!server running on port 3001 bro!_*---')
})