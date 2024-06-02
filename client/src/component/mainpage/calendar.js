import React, { useState, useEffect } from 'react';
import './calendar.css';
import axios from 'axios';
import Modal from './modalCalendar';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [refresh, setRefresh] = useState(false);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`https://wwappi.shop/calendar/${year}/${month + 1}`); // 현재 년도와 월에 해당하는 일정 가져오기
        if (response.status === 200) {
          const data = response.data;
          const newEvents = {};

          //생일 추가
          data.birthdays.forEach(birthday => {
            const dateKey = new Date(birthday.birthday).toISOString().split('T')[0];
            if (!newEvents[dateKey]) newEvents[dateKey] = [];
            newEvents[dateKey].push(`${birthday.name}의 생일`);
          });

          //사용자가 추가하는 일정
          data.calendars.forEach(calendar => {
            const date = new Date(calendar.date);
            date.setDate(date.getDate() + 1); // 왜인지 모르겠는데 일정이 하루 앞에서 표시가 되어서 일부러 하루 더함
            const dateKey = date.toISOString().split('T')[0];
            if (!newEvents[dateKey]) newEvents[dateKey] = [];
            newEvents[dateKey].push(calendar.title);
          });

          setEvents(newEvents);
        } else {
          console.error('Failed to fetch events');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [year, month, refresh]);
  
  //캘린더 그려내기 & 렌더링 함수
  const renderCalendar = () => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startingDay = firstDayOfMonth.getDay(); //요일을 숫자로 반환함
    const totalDays = lastDayOfMonth.getDate(); //마지막 날짜를 반환함 -> 총 일 수

    const calendarArray = [];
    let currentRow = [];

    // 요일
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    currentRow = daysOfWeek.map((day, index) => (
      <div key={`day-header-${index}`} className="calendar-day-header">
        {day}
      </div>
    ));
    calendarArray.push(<div key="day-headers" className="calendar-row">{currentRow}</div>);
    currentRow = [];

    // 달력에서 빈칸 만들어내기?라고 해야하나 빈 셀 만들기
    for (let i = 0; i < startingDay; i++) {
      currentRow.push(<div key={`empty-${i}`} className="calendar-cell"></div>);
    }

    // 날짜 셀 만들기 빈 셀이랑 동일하게 반복문 돌려서 만듦.
    for (let i = 1; i <= totalDays; i++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const dayEvents = events[dateKey] || [];
      currentRow.push(
        <div key={`day-${i}`} className="calendar-cell" onClick={() => handleDateClick(i)}>
          <div className="calendar-cell-day">{i}</div>
          <div className="calendar-events">
            {dayEvents.slice(0, 2).map((event, index) => (
              <div key={index} className="calendar-event">{event}</div>
            ))}
            {dayEvents.length > 2 && (
              <div className="calendar-event-more">+{dayEvents.length - 2}</div>
            )}
          </div>
        </div>
      );
      
      //만약 일요일이면 다음주로 넘어가서 시작하기
      if ((i + startingDay) % 7 === 0) {
        calendarArray.push(<div key={`row-${calendarArray.length}`} className="calendar-row">{currentRow}</div>);
        currentRow = [];
      }
    }

    //마지막 주 남은 빈 셀 채우기
    const remainingEmptyCells = 7 - (totalDays + startingDay) % 7;
    if (remainingEmptyCells !== 7) {
      for (let i = 0; i < remainingEmptyCells; i++) {
        currentRow.push(<div key={`empty-${totalDays + i + 1}`} className="calendar-cell"></div>);
      }
      calendarArray.push(
        <div key={`row-${calendarArray.length}`} className="calendar-row last-row">
          {currentRow.map((cell, index) => 
            React.cloneElement(cell, {
              className: `${cell.props.className} ${index === 0 ? 'first-cell' : ''} ${index === currentRow.length - 1 ? 'last-cell' : ''}`
            })
          )}
        </div>
      );
    }

    return calendarArray;
  };

  //날짜를 클릭했을때 모달창을 띄우는 함수
  const handleDateClick = (day) => {
    const date = new Date(year, month, day);
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  //모달창 닫는 함수, 닫을때마다 일정 데이터 새로고침
  const closeModal = () => {
    setIsModalOpen(false);
    setRefresh((prev) => !prev);
  };

  //모달창에서 일정을 추가하는 함수
  const addSchedule = (eventTitle) => {
    const dateKey = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateKey]: [...(prevEvents[dateKey] || []), eventTitle],
    }));
  };

  //이전달로 이동하는 함수
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  //다음달로 이동하는 함수
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="move-month-button" onClick={goToPreviousMonth}>&lt;</button> {/*이전 달로 이동*/}
        <h2>{year}년 {currentDate.toLocaleString('default', { month: 'long' })}</h2>    {/*현재 년도와 월 표시*/}
        <button className="move-month-button" onClick={goToNextMonth}>&gt;</button>     {/*다음 달로 이동*/}
      </div>
      <div className="calendar-body">
        {renderCalendar()} {/*캘린더 그리기*/}
      </div>
      {isModalOpen && <Modal selectedDate={selectedDate} closeModal={closeModal} addSchedule={addSchedule} />} {/*모달창 띄우기*/}
    </div>
  );
}

export default Calendar;