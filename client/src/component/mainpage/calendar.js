import React, { useState, useEffect } from 'react';
import './calendar.css';
import API from '../utils/API.js'
import Modal from './modalCalendar.js';
import styled from 'styled-components'

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);        // 모달의 표시 여부를 관리하는 상태
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});     // 날짜별 일정을 저장할 상태
  const year = currentDate.getFullYear();       //현재 연도 가져오기
  const month = currentDate.getMonth();         //현재 월 가져오기

  const renderCalendar = () => {             
    const firstDayOfMonth = new Date(year, month, 1);     // 첫째날의 날짜 객체
    const lastDayOfMonth = new Date(year, month + 1, 0);  // 마지막날의 날짜 객체
    const startingDay = firstDayOfMonth.getDay();         // 첫째날의 요일 (일요일을 0으로 시작)
    const totalDays = lastDayOfMonth.getDate();           // 월의 총 일 수

    const calendarArray = []; //캘린더를 저장할 배열 생성 및 초기화
    let currentRow = [];     //현재 행을 저장할 배열 생성 및 초기화

    //일요일부터 토요일까지 요일을 반복문을 돌려 추가했습니다.
    for (let i = 1; i <= 7; i++) { 
      currentRow.push(
        <div key={`days-${i}`} className="calendar-days-cell"> 
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i - 1]}
        </div>
      );
    }
    calendarArray.push(<div key={`row-${calendarArray.length}`} className="calendar-row">{currentRow}</div>);
    currentRow = [];

    //요일을 숫자로 반환하기 때문에 반복문을 이용해 첫째날의 요일보다 작은 값을 가진 요일들을 빈 셀로 만들었습니다.
    for (let i = 0; i < startingDay; i++) {
      currentRow.push(<div key={`empty-${i}`} className="calendar-cell"></div>); 
    } 

    //월의 총 일 수만큼 반복문을 돌려서 날짜를 추가했슴니둥
    for (let i = 1; i <= totalDays; i++) {
      const dateKey = `${year}-${month + 1}-${i}`;
      currentRow.push(
        <div key={`day-${i}`} className="calendar-cell" onClick={() => handleDateClick(i)}>
          <div className="calendar-cell-day">
            {i}
          </div>
          <div className="calendar-events">
            {events[dateKey] && events[dateKey].map((event, index) => (
              <div key={index} className="calendar-event">{event}</div>
            ))}
          </div>
        </div>
      );

      // 주의 마지막 날이거나 새 주가 시작될 때 행을 채우고 새로운 행 시작하기
      if ((i + startingDay) % 7 === 0) {
        calendarArray.push(<div key={`row-${calendarArray.length}`} className="calendar-row">{currentRow}</div>);
        currentRow = [];
      }
    }

    //마지막 주 남은 빈 셀 채우기
    const remainingEmptyCells = 7 - (totalDays + startingDay) % 7; //남은 빈 셀 수 계산하기
    if (remainingEmptyCells !== 7) {                               //한 주가 완전히 비어있지 않을때만 실행
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

    return calendarArray; //calendarArray 반환
  };

  const handleDateClick = (day) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = new Date(year, month, day); // 선택한 날짜를 Date 객체로 생성
    setSelectedDate(date);                   // 선택한 날짜를 상태에 저장
    setIsModalOpen(true);                    // 모달을 표시
  };

  // 모달을 닫는 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 일정을 추가하고 저장하는 함수
  const addSchedule = async (eventTitle) => {
    const dateKey = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
    const newEvent = {
      date: dateKey,
      title: eventTitle
    };
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    //현재 월에서 1을 뺀 월을 가져오기 == 이전 달로 이동
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    //현재 월에서 1을 더한 월을 가져오기 == 다음 달로 이동
  };

  return (
    <div className="calendar">
      {isModalOpen && (
        <Modal selectedDate={selectedDate} closeModal={closeModal} addSchedule={addSchedule}/>
      )}
      <div className="calendar-header">
        <button className="move-month-button" onClick={goToPreviousMonth}>&lt;</button>                                       {/*이전 달로 이동하는 버튼*/}
        <div className="calendar-header-date"S>{currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</div>  {/*현재 연도와 월 표시*/}
        <button className="move-month-button" onClick={goToNextMonth}>&gt;</button>                                               {/*다음 달로 이동하는 버튼*/}
      </div>
      <div className="calendar-grid">{renderCalendar()}</div> {/*열들을 수직으로 배열하기*/}
    </div>
  );
}

export default Calendar;