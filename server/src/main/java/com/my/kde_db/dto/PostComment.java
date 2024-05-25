package com.my.kde_db.dto;

import lombok.Data;

import java.util.Date;

@Data
public class PostComment {
    private int c_number;
    private String comment;
    private Date date;
    private String name;
    private String nickname;
}
