package com.my.kde_db.dto;

import com.my.kde_db.utils.Base64Utils;
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


        // byte[] 데이터로 이미지 설정 시 Base64 문자열로 변환하여 저장

}


