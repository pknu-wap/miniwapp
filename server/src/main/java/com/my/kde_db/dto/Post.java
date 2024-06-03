package com.my.kde_db.dto;


import lombok.Data;

import java.util.Date;

@Data
public class Post {
    private int p_number; // 게시글 번호
    private int number; // 세션에서 추출될 사용자 번호
    private String title;
    private String contents;
    private Date date;
    private int view_count;


}
