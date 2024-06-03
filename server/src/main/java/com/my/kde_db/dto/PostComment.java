package com.my.kde_db.dto;

import lombok.Data;

import java.util.Date;

@Data
public class PostComment {
    private int c_number; //댓글 번호
    private int post_number; // 해당 댓글이 달린 게시글 번호
    private int user_number;
    private String comment;
    private Date date;
    private String name;
    private String nickname;
}
