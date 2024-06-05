import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import API from '../utils/API';

const ModalWrapper = styled.div`
  display: flex;
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  justify-content: center;
  align-items: center;
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 10%;
`;

const ModalContent = styled.div`
  width: 50%;
  height: 50%;
  background-color: #fefefe;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
`;

const ModalContentSchedule = styled(ModalContent)`
  height: 20%;
`;

const CloseButton = styled.span`
  color: gray;
  float: right;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;

  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
  }
`;

const SelectedDate = styled.p`
  font-size: 20px; /* adjust this if needed */
`;

const ScheduleBar = styled.div`
  display: block;
  margin-bottom: 1rem;
`;

const AddScheduleButton = styled.button`
  align-items: center;
  display: inline-flex;
  color: white;
  font-weight: bold;
  outline: none;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  height: 2.25rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1rem;
  background: #228be6;

  &:hover {
    background: #50a3eb;
  }

  &:active {
    background: #1671bf;
  }
`;

const ToDoListBody = styled.div`
  width: 99.5%;
  height: 80%;
  position: relative;
  overflow-y: auto;
  border-radius: 10px;
  background-color: rgb(200, 200, 200);
`;

const ToDoList = styled.ul`
  padding: 10px;
  width: 99.5%;
  height: 100%;
  display: block;
  justify-content: center;
  position: relative;
  vertical-align: middle;
  border-radius: 15px;
  list-style-type: none;
  text-indent: 40px;
`;

const ToDoItem = styled.li`
  margin: 0 auto;
  margin-bottom: 15px;
  padding: 10px;
  width: 98%;
  height: 30%;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: gray 2px 2px 2px;
  background-color: white;
`;

const EditScheduleButton = styled.button`
  padding: 10px;
  align-items: center;
  display: inline-flex;
  float: right;
  font-weight: bold;
  outline: none;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  height: 2.25rem;
  font-size: 1rem;
  background-color: white;

  &:hover {
    color: #50a3eb;
  }

  &:active {
    color: #1671bf;
  }
`;

const DeleteScheduleButton = styled.button`
  padding: 10px;
  align-items: center;
  display: inline-flex;
  float: right;
  font-weight: bold;
  outline: none;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  height: 2.25rem;
  font-size: 1rem;
  background-color: white;

  &:hover {
    color: #eb5050;
  }

  &:active {
    color: #bf1616;
  }
`;

const PreviousButton = styled.button`
  color: gray;
  float: left;
  border: none;
  background-color: white;
  font-size: 26px;
  font-weight: bold;
  cursor: pointer;

  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
  }
`;

const ScheduleHeader = styled.div`
  margin-top: 10px;
`;

const ScheduleTitleInput = styled.input`
  width: 70%;
  height: 100%;
  display: inline-block;
  font-size: 28px;
  font-weight: bold;
  text-indent: 10px;
  outline: none;
  border: none;

  &::placeholder {
    font-size: 28px;
    text-indent: 10px;
    text-align: left;
  }
`;

const ScheduleSaveButton = styled.input`
  align-items: center;
  display: inline-block;
  float: right;
  color: white;
  font-weight: bold;
  outline: none;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  width: 6rem;
  height: 2.25rem;
  margin-right: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1rem;
  background: #228be6;

  &:hover {
    background: #50a3eb;
  }

  &:active {
    background: #1671bf;
  }
`;

const ScheduleSelectedDate = styled.div`
  display: inline;
  margin-left: 10px;
  margin-right: 8px;
  margin-top: 6px;
  margin-bottom: 8px;
  line-height: 30px;
  color: gray;
  font-size: 15px;
`;

const ScheduleBody = styled.div`
  height: 100%;
  margin-top: 20px;
`;

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
      const response = await API.get(`calendar/${year}/${month}`, {withCredentials: true});
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
      const response = await API.post('calendar', newEvent, {withCredentials: true});
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
      const response = await API.put('calendar', editEvent, {withCredentials: true});
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
      const response = await API.delete(`calendar/${id}`, {withCredentials: true});
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
    <ModalWrapper>
      {mode === 'default' && (
        <>
          <ModalContent>
            <CloseButton onClick={() => { closeModal(); }}>×</CloseButton>
            <SelectedDate>{formattedDate}</SelectedDate>
            <ScheduleBar>
              <AddScheduleButton onClick={() => setMode('schedule')}>일정 추가</AddScheduleButton>
            </ScheduleBar>
            <ToDoListBody>
              <ToDoList>
                {schedules.map((event) => (
                  <ToDoItem key={event.id}>
                    {event.title}
                    <DeleteScheduleButton onClick={() => handleDeleteEvent(event.id)}>삭제</DeleteScheduleButton>
                    <EditScheduleButton onClick={() => { setMode('schedule'); setScheduleNumber(event.id); setScheduleText(event.title); }}>수정</EditScheduleButton>
                  </ToDoItem>
                ))}
              </ToDoList>
            </ToDoListBody>
          </ModalContent>
        </>
      )}

      {mode === 'schedule' && (
        <>
          <ModalContentSchedule>
            <form method="post" onSubmit={handleAddEvent}>
              <ModalHeader>
                <PreviousButton onClick={() => { setMode('default'); setScheduleNumber(null); setScheduleText(''); }}>&lt;</PreviousButton>
                <ScheduleSelectedDate>{formattedDate}</ScheduleSelectedDate>
                <CloseButton onClick={() => { closeModal(); }}>&times;</CloseButton>
              </ModalHeader>
              <ScheduleHeader>
                <ScheduleTitleInput
                  type="text"
                  value={scheduleText}
                  onChange={(e) => setScheduleText(e.target.value)}
                  placeholder="일정을 입력하세요"
                />
                <ScheduleSaveButton type="submit" value="저장" />
              </ScheduleHeader>
              <ScheduleBody></ScheduleBody>
            </form>
          </ModalContentSchedule>
        </>
      )}
    </ModalWrapper>
  );
}

export default Modal;