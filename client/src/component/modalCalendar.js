import React, { useState } from 'react';
import './modalCalendar.css';


function Modal({ selectedDate, closeModal }) {
  const formattedDate = selectedDate ? selectedDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  const [ popup, setPopup ] = useState(false); 

  return (
    <div className="modal">
      <div className="modal-content">
        {popup ? <Schedule onClose={setPopup} date={formattedDate}/> : null}
        <span className="close" onClick={closeModal}>&times;</span>
        <p className="selected-date">{formattedDate}</p>
        <div>
          <button className="add-button" onClick={() => {
            setPopup(true);
          }}>일정 추가</button>
        </div>
        <div className="to-do-list-body">
          
        </div>
      </div>
    </div>
  );
}

function Schedule(props) {
  // const formattedDate = selectedDate ? selectedDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => { props.onClose(false) }}>&times;</span>
        <button className="previous-button"></button>  {/*일정 목록으로 돌아가는 버튼*/}
        <div className="schedule-title">일정 제목</div>
        <div className="selected-date">{props.date}</div>
        <div className="schedule-body">

        </div>
      </div>
    </div>
  )
}

export default Modal;