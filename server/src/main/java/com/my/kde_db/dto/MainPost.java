package com.my.kde_db.dto;

import lombok.Data;

@Data
public class MainPost {
    private String title = null;
    private String name = null;
    private int userNumber=0;
    private int viewCount= 0; //CamelCase로 작성
    private int number = 0;
}
