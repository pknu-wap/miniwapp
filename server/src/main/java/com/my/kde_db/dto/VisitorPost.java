package com.my.kde_db.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.sql.Date;

@Data
public class VisitorPost {
    private int number=0;
    private String name=null;
    private String nickname=null;
    private byte[] image=null;
    private int visitorNumber=0;
    private String contents=null;
    private Date date=null;
    private VisitorComment comment=null;
}
