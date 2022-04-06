import React from 'react'
import '../Styles/EditPopup.css'
import { useState } from 'react'

function EditPopup({trigger, setTrigger, passData, updateCallBack, updateDB, prevName, prevAge, prevCountry, prevPosition, prevWage}) {

  const [newName, setNewName] = useState(prevName);
  const [newAge, setNewAge] = useState(prevAge);
  const [newCountry, setNewCountry] = useState(prevCountry);
  const [newPosition, setNewPosition] = useState(prevPosition);
  const [newWage, setNewWage] = useState(prevWage);

  const functionHandler = (data) => {
    passData(data);
  }

  return (trigger) ? (
    <div className='Popup'>
        <div className="PopupContent">
            <h3>Currently Editing *Persons name*</h3>
              <div className='PropertyList'>
                <div className='PropertyListItem'>
                  <h3>Name: </h3>
                  <input type= "text" placeholder='new name..' onChange={(e) => {
                    setNewName(e.target.value);
                  }}></input>
                </div>
                <div className='PropertyListItem'>
                  <h3>Age: </h3>
                  <input type= "number" placeholder='new age..' onChange={(e) => {
                    setNewAge(e.target.value);
                  }}></input>
                </div><div className='PropertyListItem'>
                  <h3>Country: </h3>
                  <input type= "text" placeholder='new country..' onChange={(e) => {
                    setNewCountry(e.target.value);
                  }}></input>
                </div>
                <div className='PropertyListItem'>
                  <h3>Position: </h3>
                  <input type= "text" placeholder='new position..' onChange={(e) => {
                    setNewPosition(e.target.value);
                  }}></input>
                </div>
                <div className='PropertyListItem'>
                  <h3>Wage: </h3>
                  <input type= "number" placeholder='new wage..' onChange={(e) => {
                    setNewWage(e.target.value);
                  }}></input>
                </div>
              </div>
            <button className='btnConfirm' onClick={() => {functionHandler({fisrt: newName}); updateDB();}}>Confirm</button>
            <button className='btnCancel' onClick={() => setTrigger(false)}>Cancel</button>
        </div>
    </div>
  ) : "";
}

export default EditPopup /* updateCallBack(newName, newAge, newCountry, newPosition, newWage); */