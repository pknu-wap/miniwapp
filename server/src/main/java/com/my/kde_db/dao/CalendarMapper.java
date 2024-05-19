package com.my.kde_db.dao;

import com.my.kde_db.vo.Birthday;
import com.my.kde_db.vo.Calendar;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CalendarMapper {
    List<Calendar> findByYearMonth(int year, int month);
    List<Birthday> findBirthday(int month);

    void createCalendar(Calendar calendar);

    void updateCalendar(Calendar calendar);

    void deleteByNumber(int number);
}
