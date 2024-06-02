import React, { useState, useEffect } from 'react';
import './modalCalendar.css';
import axios from 'axios';

function Modal({ selectedDate, closeModal, addSchedule }) {
  const formattedDate = selectedDate ? selectedDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }) : '-';
  const formattedDateISO = selectedDate ? selectedDate.toISOString() : '-';
  const [mode, setMode] = useState('default');
  const [scheduleText, setScheduleText] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [scheduleNumber, setScheduleNumber] = useState(null);

  const fetchEvents = async () => {
    try {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const response = await axios.get(`https://wwappi.shop/calendar/${year}/${month}`);
      if (response.status === 200) {
        const events = Array.isArray(response.data.calendars) ? response.data.calendars : [];
        const eventsForSelectedDate = events.filter(event => {
          const eventDate = new Date(event.date).toISOString().split('T')[0];
          return eventDate === formattedDateISO.split('T')[0];
        });
        const eventsWithId = eventsForSelectedDate.map(event => ({ ...event, id: event.number }));
        setSchedules(eventsWithId);
      } else {
        console.error('Failed to fetch events');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddEvent = async (event) => {
    event.preventDefault();
    if (scheduleNumber !== null) {
      await handleEditEvent();
      return;
    }

    const newEvent = {
      date: formattedDateISO,
      title: scheduleText,
    };

    try {
      const response = await axios.post('https://wwappi.shop/calendar', newEvent);
      if (response.status === 200) {
        setSchedules([...schedules, { ...newEvent, id: response.data.number }]);
        addSchedule(scheduleText);
        setScheduleText('');
        setMode('default');
        await fetchEvents();  // 일정 추가 후 일정 다시 불러오기
      } else {
        console.error('Failed to save event');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditEvent = async () => {
    const editEvent = {
      date: formattedDateISO,
      title: scheduleText,
      number: scheduleNumber,
    };

    try {
      const response = await axios.put('https://wwappi.shop/calendar', editEvent);
      if (response.status === 200) {
        setSchedules(schedules.map((evt) => (evt.id === scheduleNumber ? { ...editEvent, id: scheduleNumber } : evt)));
        setScheduleText('');
        setScheduleNumber(null);
        setMode('default');
        await fetchEvents();  // 일정 수정 후 일정 다시 불러오기
      } else {
        console.error('Failed to update event');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      const response = await axios.delete(`https://wwappi.shop/calendar/${id}`);
      if (response.status === 200) {
        setSchedules(schedules.filter((event) => event.id !== id));
      } else {
        console.error('Failed to delete event');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchEvents();
    }
  }, [selectedDate, formattedDateISO]);

  return (
    <div className="modal">
      {mode === 'default' && (
        <>
          <div className="modal-content">
            <span className="close" onClick={() => { closeModal(); }}>×</span>
            <p className="selected-date">{formattedDate}</p>
            <div className="schedule-bar">
              <button className="add-schedule" onClick={() => setMode('schedule')}>일정 추가</button>
            </div>
            <div className="to-do-list-body">
              <ul className="to-do-list">
                {schedules.map((event) => (
                  <li key={event.id} className="to-do">
                    {event.title}
                    <button className="delete-schedule" onClick={() => handleDeleteEvent(event.id)}>삭제</button>
                    <button className="edit-schedule" onClick={() => { setMode('schedule'); setScheduleNumber(event.id); setScheduleText(event.title); }}>수정</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}

      {mode === 'schedule' && (
        <>
          <div className="modal-content-schedule">
            <form method="post" className="" onSubmit={handleAddEvent}>
              <div className="modal-header">
                <button className="previous-button" onClick={() => { setMode('default'); setScheduleNumber(null); setScheduleText(''); }}>&lt;</button>
                <div className="schedule-selected-date">{formattedDate}</div>
                <span className="close" onClick={() => { closeModal(); }}>&time;</span>
              </div>
              <div className="schedule-header">
                <input
                  type="text"
                  value={scheduleText}
                  onChange={(e) => setScheduleText(e.target.value)}
                  placeholder="일정을 입력하세요"
                  className="schedule-title"
                />
                <input type="submit" value="저장" className="schedule-save-button" />
              </div>
              <div className="schedule-body">
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default Modal;
