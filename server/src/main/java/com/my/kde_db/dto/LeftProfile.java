package com.my.kde_db.dto;

import lombok.Data;

@Data
public class LeftProfile {
    private String name;
    private String nickname;
    private String introduction;
    private String pagename;
    private String image;  // Base64로 인코딩된 이미지 데이터
}
