package com.my.kde_db.dto;

import lombok.Data;

import java.util.List;

@Data
public class PostDetails {
    private String title;
    private String contents;
    private int view_count;
    private String name;
    private String nickname;
    private List<PostComment> comments;
}
