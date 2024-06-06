package com.my.kde_db.dto;

import lombok.Data;

import java.util.List;

@Data
public class PostDetails {
    private String title;
    private String contents;
    private int viewCount;
    private String name;
    private String nickname;
    private List<PostComment> comments;
    private int number; // 댓글번호..??
}
