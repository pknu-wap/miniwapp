package com.my.kde_db.dto;

import lombok.Data;

import java.sql.Date;

@Data
public class VisitorComment {
    private String name=null;
    private String nickname=null;
    private String comment=null;
    private Date date=null;
}
