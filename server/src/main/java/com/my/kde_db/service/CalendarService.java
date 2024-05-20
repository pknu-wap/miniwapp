package com.my.kde_db.service;

import com.my.kde_db.dao.CalendarMapper;
import com.my.kde_db.vo.CalAndBirth;
import com.my.kde_db.vo.Calendar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CalendarService {
    @Autowired
    CalendarMapper calenderMapper;

    public CalAndBirth findByYearMonth(int year, int month) {
        CalAndBirth calAndBirth=new CalAndBirth();
        calAndBirth.setCalendars(calenderMapper.findByYearMonth(year, month));
        calAndBirth.setBirthdays(calenderMapper.findBirthday(month));
        return calAndBirth;
    }

    public void createCalendar(Calendar calendar){
        calenderMapper.createCalendar(calendar);
    }

    public void updateCalendar(Calendar calendar){
        calenderMapper.updateCalendar(calendar);
    }

    public void deleteCalendar(int number){
    calenderMapper.deleteByNumber(number);
    }

}
