import './App.css';
import { useState } from 'react'
import Axios from 'axios'
import EmployeeItem from './Components/EmployeeItem';

function App() {

  //TODO: 

  // -The data from testData is the previous states data, look into that 
  // -the delete button doestn work right away after making an item becuase it needs to get sent to the database
  //   and ID so it can grab that and delete it



  //#region  variables
  const [name,setName] = useState("");
  const [age,setAge] = useState(0);
  const [country,setCountry] = useState("");
  const [position,setPosition] = useState("");
  const [wage,setWage] = useState(0);

  const [testData, setTestData] = useState([]);

  const [employeeList, setEmployeeList] = useState([]);
  //#endregion

  //#region  serverRequests
  const getEmployees = () => {
    Axios.get('http://localhost:3001/employees').then((response)=> {  //the client side request for employees
      setEmployeeList(response.data)
    })
  }

  const updateEmployeeDetails = (employeeID) => {

    console.log(testData);
    const [edittedName, edittedAge, edittedCountry, edittedPosition, edittedWage] = testData;
    console.log('destructured');
    console.log('new Details are ' + edittedName +  edittedAge +  edittedCountry +  edittedPosition +  edittedWage);

   /*  Axios.put('http://localhost:3001/update', {name: edittedName, age: edittedAge, country: edittedCountry, position: edittedPosition, wage: edittedWage, id: employeeID}).then(
      (response) => {
        alert('Updated')
      }
    ) */
  }


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
    Axios.delete(`http://localhost:3001/delete/${employeeID}`);
    console.log('Deleted Client Side with iD: ' + employeeID)
    setEmployeeList(employeeList.filter(obj => obj.Id !==employeeID)); //sets the list to the existing list minus the deleted employee
  }

  //#endregion

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
      <h3>{testData}</h3>
      <div className='employeeContainer'>
        {employeeList.map((val) => {
          return <EmployeeItem
          empName={val.name}
          empAge={val.age}
          empCountry={val.country}
          empPosition={val.position}
          empWage={val.wage}
          _updateCallBack={setTestData} 
          _updateDB={() => updateEmployeeDetails(val.Id)}        //getNewDetails from child form and then updates the employee by its ID
          deleteFunc={() => deleteEmployee(val.Id)}
          />
        })}
      </div>
     </div>
  );
}

export default App;
