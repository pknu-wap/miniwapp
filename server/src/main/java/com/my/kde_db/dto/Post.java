package com.my.kde_db.dto;


import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class Post {
    private int p_number; // 게시글 번호
    private int number; // 세션에서 추출될 사용자 번호
    private String title;
    private String contents;
    private LocalDateTime date;
    private int viewCount;
}
