package com.my.kde_db.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserHome {
        private int number = 0;
        private String name = null;
        private String pagename = null;
        private String nickname=null;
        private String image = null;
        private String introduction = null;
        private String youtubelink = null;
        private List<PostInfo> posts=null;
}


