import React, { useState } from 'react';
import './modalCalendar.css';

function Modal({ selectedDate, closeModal }) {
  
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <p>{selectedDate}</p>
      </div>
    </div>
  );
}

export default Modal;