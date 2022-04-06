import './App.css';
import { useState } from 'react'
import Axios from 'axios'
import EmployeeItem from './Components/EmployeeItem';

function App() {
  const [name,setName] = useState("");
  const [age,setAge] = useState(0);
  const [country,setCountry] = useState("");
  const [position,setPosition] = useState("");
  const [wage,setWage] = useState(0);

  const [testData, setTestData] = useState('');

  let updatedEmployeeInfo;

  const [employeeList, setEmployeeList] = useState([]);

  const getEmployees = () => {
    Axios.get('http://localhost:3001/employees').then((response)=> {  //the client side request for employees
      setEmployeeList(response.data)
    })
  }

  const updateEmployeeDetails = (employeeID) => {
    console.log(testData);
    Axios.put('http://localhost:3001/update', {name: updatedEmployeeInfo.newName, age: updatedEmployeeInfo.newAge, country: updatedEmployeeInfo.newCountry, position: updatedEmployeeInfo.newPosition, wage: updatedEmployeeInfo.newWage, id: employeeID}).then(
      (response) => {
        alert('Updated')
      }
    )
  }

  const getNewDetails = (_name, _age, _country, _position, _wage) => {        //stores the data from the child class (editPopup) in an object to use in the update request
    
    console.log('new details are: ' + _name + _age + _country + _position + _wage);
    updatedEmployeeInfo.newName = _name;
    updatedEmployeeInfo.newAge = _age;
    updatedEmployeeInfo.newCountry = _country;
    updatedEmployeeInfo.newPosition = _position;
    updatedEmployeeInfo.newWage = _wage;
  }


  //the delete button doestn work right away after making an item becuase it needs to get sent to the database
  //and ID so it can grab that and delete it

  const addEmployee = () => {
    Axios.post('http://localhost:3001/create', {    //the client side post request of adding the employee to the database
      name: name,
      age: age, 
      country: country, 
      position: position, 
      wage: wage
    }).then(()=> {
      console.log('success');       //logs success and then adds the new employee in the lsit
      setEmployeeList([...employeeList, 
      {
        name: name,
        age: age, 
        country: country, 
        position: position, 
        wage: wage
      }])
    })
  }

  const deleteEmployee = (employeeID) => {
    console.log(employeeList);
    Axios.delete(`http://localhost:3001/delete/${employeeID}`);
    console.log('Deleted Client Side with iD: ' + employeeID)
    setEmployeeList(employeeList.filter(obj => obj.Id !==employeeID)); //sets the list to the existing list minus the deleted employee
  }

  return (
    <div className="App">
      <div className='InputForm'>        {/* this is all the inputs */}   
          <label>Name:</label>
          <input type="text" onChange={(event) => {
                setName(event.target.value);
              }}>
            </input>
          <label>Age:</label>
          <input type="number" onChange={(event) => {
                setAge(event.target.value);
              }}>
            </input>
          <label>Country:</label>
          <input type="text"  onChange={(event) => {
                setCountry(event.target.value);
              }}>
            </input>
          <label>Position:</label>
          <input type="text" onChange={(event) => {
                setPosition(event.target.value);
              }}>
            </input>
          <label>Wage:</label>
          <input type="number" onChange={(event) => {
                setWage(event.target.value);
              }}>
            </input>
          <button className='btnAddEmployee' onClick={addEmployee}>Add Employee</button>
      </div>
      <button className='btnShowEmployees' onClick={getEmployees}>Show Employees</button>
      <div className='employeeContainer'>
        {employeeList.map((val) => {
          return <EmployeeItem
          empName={val.name}
          empAge={val.age}
          empCountry={val.country}
          empPosition={val.position}
          empWage={val.wage}
          passData={setTestData}
          updateCallBack={() => getNewDetails()} 
          updateDB={() => updateEmployeeDetails(val.Id)}        //getNewDetails from child form and then updates the employee by its ID
          deleteFunc={() => deleteEmployee(val.Id)}
          />
        })}
      </div>
     </div>
  );
}

export default App;
