package com.my.kde_db.dto;

import lombok.Data;
import lombok.Setter;

@Data
public class LeftProfile {
    private String name = null;
    private String nickname = null;
    private String introduction = null;
    private String pagename = null;
    private byte[] image = null;
    // 데이터베이스와 호환되는 바이트 배열
    @Setter
    private String base64Image; // 클라이언트에 전달용 Base64 인코딩된 이미지

}

