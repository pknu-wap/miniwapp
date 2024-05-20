import React, { useState } from 'react';
import './modalCalendar.css';
import API from '../utils/API'
import axios from "axios";

function Modal({ selectedDate, closeModal, addEvent }) {
  const formattedDate = selectedDate ? selectedDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
  const [mode, setMode] = useState('default');
  const [eventText, setEventText] = useState('');

  let [date, setDate] = useState('');
  let [title, setTitle] = useState('');

  const saveDate = event => { setDate(event.target.value); };
  const saveTitle = event => { setTitle(event.target.value); };

  const handleAddEvent = (e) => {
    e.preventDefault();
    addEvent(eventText);
    setEventText('');
  };

  return (
    <div className="modal">
      {mode ==='default' && (
        <>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span> {/*닫기 버튼*/}
            <p className="selected-date">{formattedDate}</p> {/*클릭한 날짜*/}
            <div>
              {/*일정 추가 버튼*/}
              <button className="schedule-add-button" onClick={() => { 
                if (mode !== 'schedule') { setMode('schedule'); }
              }}>일정 추가</button>
            </div>
            <div className="to-do-list-body">
              
            </div>
          </div>
        </>
      )}

      {mode === 'schedule' && (
        <>
          <div className="modal-content">
            <form method="post" name="add-schedule" className="" onSubmit={e => {
              handleAddEvent(e);
              const calendarAddSchedule = {
                date: date,
                title: title
              };
              console.log(calendarAddSchedule);
              API.post("calendar/create", JSON.stringify(calendarAddSchedule), { withCredentials: true  });
            }}>
              <div className="modal-header"> {/*header : 이전 버튼, 선택한 날짜, 닫기버튼*/}
                <button className="previous-button" onClick={() => {
                  if (mode !== 'default') { setMode('default'); }
                }}>&lt;</button>
                <div className="schedule-selected-date">{formattedDate}</div>
                <span className="close" onClick={closeModal}>&times;</span>
              </div>
              <div>
                <input 
                  type="text" 
                  value={eventText} 
                  onChange={(e) => setEventText(e.target.value)} 
                  placeholder="일정을 입력하세요"
                  className="schedule-title" 
                /> 
                <input type="submit" value="저장" className="schedule-save-button" onSubmit={handleAddEvent}></input>
              </div>
              <div className="schedule-body"> {/*일정 내용*/}
                <input className="schedule-content"></input>
              </div>
            </form>
          </div>
        </>
        )
      }
    </div>
  );
}

export default Modal;