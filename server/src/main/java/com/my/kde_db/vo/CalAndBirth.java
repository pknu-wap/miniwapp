package com.my.kde_db.vo;

import lombok.Data;

import java.util.List;

@Data
public class CalAndBirth {
    private List<Birthday> birthdays=null;
    private List<Calendar> calendars=null;
}
