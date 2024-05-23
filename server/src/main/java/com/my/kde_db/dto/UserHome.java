package com.my.kde_db.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserHome {
        private String youtubelink = null;
        private List<PostInfo> posts = null;
}


