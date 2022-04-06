import React from 'react'
import '../Styles/EditPopup.css'

function EditPopup({trigger, setTrigger}) {
  return (trigger) ? (
    <div className='Popup'>
        <div className="PopupContent">
            <h3>Currently Editing *Persons name*</h3>
              <div className='PropertyList'>
                <div className='PropertyListItem'>
                  <h3>Name: </h3>
                  <input type= "text" placeholder='new name..'></input>
                </div>
                <div className='PropertyListItem'>
                  <h3>Age: </h3>
                  <input type= "number" placeholder='new age..'></input>
                </div><div className='PropertyListItem'>
                  <h3>Country: </h3>
                  <input type= "text" placeholder='new country..'></input>
                </div>
                <div className='PropertyListItem'>
                  <h3>Position: </h3>
                  <input type= "text" placeholder='new position..'></input>
                </div>
                <div className='PropertyListItem'>
                  <h3>Wage: </h3>
                  <input type= "number" placeholder='new wage..'></input>
                </div>
              </div>
            <button className='btnConfirm'>Confirm</button>
            <button className='btnCancel' onClick={() => setTrigger(false)}>Cancel</button>
        </div>
    </div>
  ) : "";
}

export default EditPopup