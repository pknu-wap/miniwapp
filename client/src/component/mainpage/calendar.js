import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import API from '../utils/API';
import Modal from './modalCalendar';

const CalendarContainer = styled.div`
  font-family: Arial, sans-serif;
  border-radius: 20px;
  z-index: 1;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 8px;
`;

const CalendarGrid = styled.div`
  display: flex;
  flex-direction: column;
`;

const CalendarRow = styled.div`
  display: flex;
`;

const CalendarCell = styled.div`
  width: 100px;
  height: 50px;
  flex: 1;
  border: 1px solid #ccc;
  padding: 12px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const CalendarCellDay = styled.div`
  text-align: right;
  line-height: 2px;
`;

const CalendarDayHeader = styled.div`
  flex: 1;
  text-align: center;
  padding: 10px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
`;

const MoveMonthButton = styled.button`
  color: #aaa;
  border: none;
  background-color: white;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
`;

const CalendarHeaderDate = styled.h2`
  font-size: 20px;
`;

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
        const response = await API.get(`calendar/${year}/${month + 1}`, { withCredentials: true }); // 현재 년도와 월에 해당하는 일정 가져오기
        if (response.status === 200) {
          const data = response.data;
          const newEvents = {};

          // 생일 추가
          data.birthdays.forEach(birthday => {
            const dateKey = new Date(birthday.birthday).toISOString().split('T')[0];
            if (!newEvents[dateKey]) newEvents[dateKey] = [];
            newEvents[dateKey].push(`${birthday.name}의 생일`);
          });

          // 사용자가 추가하는 일정
          data.calendars.forEach(calendar => {
            const date = new Date(calendar.date);
            date.setDate(date.getDate() + 1); // 일정이 하루 앞에서 표시가 되어서 하루 더함
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

  // 캘린더 그려내기 & 렌더링 함수
  const renderCalendar = () => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startingDay = firstDayOfMonth.getDay(); // 요일을 숫자로 반환함
    const totalDays = lastDayOfMonth.getDate(); // 마지막 날짜를 반환함 -> 총 일 수

    const calendarArray = [];
    let currentRow = [];

    // 요일
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    currentRow = daysOfWeek.map((day, index) => (
      <CalendarDayHeader key={`day-header-${index}`}>
        {day}
      </CalendarDayHeader>
    ));
    calendarArray.push(<CalendarRow key="day-headers">{currentRow}</CalendarRow>);
    currentRow = [];

    // 달력에서 빈칸 만들어내기
    for (let i = 0; i < startingDay; i++) {
      currentRow.push(<CalendarCell key={`empty-${i}`} />);
    }

    // 날짜 셀 만들기
    for (let i = 1; i <= totalDays; i++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const dayEvents = events[dateKey] || [];
      currentRow.push(
        <CalendarCell key={`day-${i}`} onClick={() => handleDateClick(i)}>
          <CalendarCellDay>{i}</CalendarCellDay>
          <div className="calendar-events">
            {dayEvents.slice(0, 2).map((event, index) => (
              <div key={index} className="calendar-event">{event}</div>
            ))}
            {dayEvents.length > 2 && (
              <div className="calendar-event-more">+{dayEvents.length - 2}</div>
            )}
          </div>
        </CalendarCell>
      );

      // 만약 일요일이면 다음주로 넘어가서 시작하기
      if ((i + startingDay) % 7 === 0) {
        calendarArray.push(<CalendarRow key={`row-${calendarArray.length}`}>{currentRow}</CalendarRow>);
        currentRow = [];
      }
    }

    // 마지막 주 남은 빈 셀 채우기
    const remainingEmptyCells = 7 - (totalDays + startingDay) % 7;
    if (remainingEmptyCells !== 7) {
      for (let i = 0; i < remainingEmptyCells; i++) {
        currentRow.push(<CalendarCell key={`empty-${totalDays + i + 1}`} />);
      }
      calendarArray.push(
        <CalendarRow key={`row-${calendarArray.length}`} className="last-row">
          {currentRow.map((cell, index) => 
            React.cloneElement(cell, {
              className: `${cell.props.className} ${index === 0 ? 'first-cell' : ''} ${index === currentRow.length - 1 ? 'last-cell' : ''}`
            })
          )}
        </CalendarRow>
      );
    }

    return calendarArray;
  };

  // 날짜를 클릭했을 때 모달창을 띄우는 함수
  const handleDateClick = (day) => {
    const date = new Date(year, month, day);
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  // 모달창 닫는 함수, 닫을 때마다 일정 데이터 새로고침
  const closeModal = () => {
    setIsModalOpen(false);
    setRefresh((prev) => !prev);
  };

  // 모달창에서 일정을 추가하는 함수
  const addSchedule = (eventTitle) => {
    const dateKey = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateKey]: [...(prevEvents[dateKey] || []), eventTitle],
    }));
  };

  // 이전달로 이동하는 함수
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  // 다음달로 이동하는 함수
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <MoveMonthButton onClick={goToPreviousMonth}>&lt;</MoveMonthButton> {/* 이전 달로 이동 */}
        <CalendarHeaderDate>{year}년 {currentDate.toLocaleString('default', { month: 'long' })}</CalendarHeaderDate> {/* 현재 년도와 월 표시 */}
        <MoveMonthButton onClick={goToNextMonth}>&gt;</MoveMonthButton> {/* 다음 달로 이동 */}
      </CalendarHeader>
      <CalendarGrid>
        {renderCalendar()} {/* 캘린더 그리기 */}
      </CalendarGrid>
      {isModalOpen && <Modal selectedDate={selectedDate} closeModal={closeModal} addSchedule={addSchedule} />} {/* 모달창 띄우기 */}
    </CalendarContainer>
  );
}

export default Calendar;
