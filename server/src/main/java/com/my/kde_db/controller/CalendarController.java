package com.my.kde_db.controller;

import com.my.kde_db.vo.CalAndBirth;
import com.my.kde_db.service.CalendarService;
import com.my.kde_db.vo.Calendar;
import com.my.kde_db.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("calendar")
public class CalendarController {

    @Autowired
    CalendarService calendarService;

    @GetMapping("{year}/{month}")
    @ResponseBody
    public ResponseEntity<CalAndBirth> getCalendar(@PathVariable int year, @PathVariable int month, HttpSession session) {
        User loginUser = (User) session.getAttribute("me");
        if (loginUser != null) {
            CalAndBirth calender = calendarService.findByYearMonth(year, month);
            return ResponseEntity.ok(calender);
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping()
    public ResponseEntity<Calendar> createCalendar(@RequestBody Calendar calendar, HttpSession session){
        User loginUser = (User) session.getAttribute("me");
        if (loginUser != null) {
            calendarService.createCalendar(calendar);
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    @PutMapping()
    public ResponseEntity<Calendar> updateCalendar(@RequestBody Calendar calendar, HttpSession session){
        User loginUser = (User) session.getAttribute("me");
        if (loginUser != null) {
            calendarService.updateCalendar(calendar);
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    @DeleteMapping("{number}")
    public ResponseEntity<Void> deleteCalender(@PathVariable int number,HttpSession session){
        User loginUser = (User) session.getAttribute("me");
        if (loginUser != null) {
            calendarService.deleteCalendar(number);
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(401).build();
        }


    }
}
