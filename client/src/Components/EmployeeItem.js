import React from 'react'
import '../Styles/EmployeeItem.css'
import EditPopup from './EditPopup'
import DeletePopup from './DeletePopup'
import { useState } from 'react'

function EmployeeItem({ empName, empAge, empCountry, empPosition, empWage, deleteFunc, _updateCallBack, _updateDB}) {
    
    const [btnPopup, setBtnPopup] = useState(false)
    const [deletePopup, setDeletePopup] = useState(false)
    //const [pls, setPls] = useState([])
    
    
    return (
    <div className='employeeItem'>
        <div className='content'>
            <h3>Name: {empName}</h3>
            <h3>Age: {empAge}</h3>
            <h3>Country: {empCountry}</h3>
            <h3>Position: {empPosition}</h3>
            <h3>Wage: {empWage}</h3>
            <button onClick={() => setBtnPopup(true)}>Edit</button>  {/* button Onclick will put it into a state to change values */}
            <button onClick={() => setDeletePopup(true)}>Delete</button>
            <EditPopup 
                trigger={btnPopup} 
                setTrigger={setBtnPopup}
                prevName={empName}
                prevAge={empAge}
                prevCountry={empCountry}
                prevPosition={empPosition}
                prevWage={empWage}
                updateCallBack={_updateCallBack}            //gets data from the editpop, through this comp and then to app
                updateDB={_updateDB}
            />
            <DeletePopup 
                trigger={deletePopup} 
                setTrigger={setDeletePopup}
                deleteEmployee={() => deleteFunc()}
            />
        </div>
    </div>
  )
}

export default EmployeeItem