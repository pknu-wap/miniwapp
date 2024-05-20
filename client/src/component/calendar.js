import React, { useState } from 'react';
import './calendar.css';
import Modal from './modalCalendar.js';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달의 표시 여부를 관리하는 상태
  const [selectedDate, setSelectedDate] = useState(null);

  const renderCalendar = () => {
    const year = currentDate.getFullYear();               //현재 연도 가져오기
    const month = currentDate.getMonth();                 //현재 월 가져오기
    const firstDayOfMonth = new Date(year, month, 1);     // 첫째날의 날짜 객체
    const lastDayOfMonth = new Date(year, month + 1, 0);  // 마지막날의 날짜 객체
    const startingDay = firstDayOfMonth.getDay();         // 첫째날의 요일 (일요일을 0으로 시작)
    const totalDays = lastDayOfMonth.getDate();           // 월의 총 일 수

    const calendarArray = []; //캘린더를 저장할 배열 생성 및 초기화
    let currentRow = [];     //현재 행을 저장할 배열 생성 및 초기화

    // 요일 추가 : 일요일부터 토요일까지 요일을 반복문을 돌려 추가했습니다.
    for (let i = 1; i <= 7; i++) { 
      currentRow.push(
        <div key={`days-${i}`} className="calendar-days-cell"> 
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i - 1]}
        </div>
      );
    }
    calendarArray.push(<div key={`row-${calendarArray.length}`} className="calendar-row">{currentRow}</div>);
    currentRow = [];

    // 첫째날 이전의 빈 셀 추가 : 요일을 숫자로 반환하기 때문에 반복문을 이용해 첫째날의 요일보다 작은 값을 가진 요일들을 빈 셀로 만들었습니다.
    for (let i = 0; i < startingDay; i++) {
      currentRow.push(<div key={`empty-${i}`} className="calendar-cell"></div>); 
      //currentRow 배열에 새로운 요소를 추가하는 코드입니다. 
      //key는 각 요소를 식별하는데 사용되는 고유한 값이고, 반복문에서 각각의 빈 셀들을 1번셀, 2번셀 이런식으로 구분하기 위해 사용했습니다.
      //이렇게 하면 empty-1, empty-2 이런 식으로 요소가 추가될거에요.
    } 

    // 월의 날짜 추가 : 월의 총 일 수만큼 반복문을 돌려서 날짜를 추가했습니다.
    for (let i = 1; i <= totalDays; i++) {
      currentRow.push(
        <div key={`day-${i}`} className="calendar-cell" onClick={() => handleDateClick(i)}>
          <div className="calendar-cell-day">
            {i}
          </div>
        </div>
        //handleDateClick으로 클릭한 날짜에 대해 작업을 추가할 수 있도록 만들었습니다.
      );

      // 주의 마지막 날이거나 새 주가 시작될 때 행을 채우고 새로운 행을 시작합니다.
      if ((i + startingDay) % 7 === 0) {
        calendarArray.push(<div key={`row-${calendarArray.length}`} className="calendar-row">{currentRow}</div>);
        currentRow = [];
        //첫째날 이전의 빈 셀 추가 코드와 같은 방식으로 새로운 행을 시작하기 위해 currentRow 배열을 초기화했습니다.
      }
    }

    //마지막 주 남은 빈 셀 채우기
    const remainingEmptyCells = 7 - (totalDays + startingDay) % 7; //남은 빈 셀 수 계산하기
    if (remainingEmptyCells !== 7) {                               //한 주가 완전히 비어있지 않을때만 실행
      for (let i = 0; i < remainingEmptyCells; i++) {
        currentRow.push(<div key={`empty-${totalDays + i + 1}`} className="calendar-cell"></div>);
      }
      calendarArray.push(<div key={`row-${calendarArray.length}`} className="calendar-row">{currentRow}</div>);
       //빈 셀을 추가한 currentRow를 calendarArray에 추가
    }

    return calendarArray; //calendarArray 반환
  };

  const handleDateClick = (day) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = new Date(year, month, day); // 선택한 날짜를 Date 객체로 생성
    setSelectedDate(date); // 선택한 날짜를 상태에 저장
    setIsModalOpen(true); // 모달을 표시
  };

  // 모달을 닫는 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    //현재 월에서 1을 뺀 월을 가져옵니다. -> 이전 달로 이동
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    //현재 월에서 1을 더한 월을 가져옵니다. -> 다음 달로 이동
  };

  return (
    <div className="calendar">
      {isModalOpen && (
        <Modal selectedDate={selectedDate} closeModal={closeModal} />
      )}
      <div className="calendar-header">
        <button onClick={goToPreviousMonth}>이전 달</button>                                       {/*이전 달로 이동하는 버튼*/}
        <div>{currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</div>  {/*현재 연도와 월 표시*/}
        <button onClick={goToNextMonth}>다음 달</button>                                               {/*다음 달로 이동하는 버튼*/}
      </div>
      <div className="calendar-grid">{renderCalendar()}</div> {/*열들을 수직으로 배열하기*/}
    </div>
  );
}

export default Calendar;