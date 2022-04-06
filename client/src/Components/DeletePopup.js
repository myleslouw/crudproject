import React from 'react'
import '../Styles/DeletePopup.css'

function DeletePopup({trigger, setTrigger, deleteEmployee}) {

    return (trigger) ? (
      <div className='DeletePopup'>
          <div className="DeletePopupContent">
              <h3>the Popup where you can Delete entriess</h3>
              <button className='btnConfirm' onClick={() => {setTrigger(false); deleteEmployee();}}>Confirm</button>
              <button className='btnCancel' onClick={() => setTrigger(false)}>Cancel</button>
          </div>
      </div>
    ) : "";
  }

export default DeletePopup