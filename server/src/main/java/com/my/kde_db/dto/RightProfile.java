package com.my.kde_db.dto;


import lombok.Data;
import lombok.Setter;

@Data
public class RightProfile {
    private int number = 0;
    private String youtubelink = null;
    private byte[] image = null;
    private String context = null;
    private String nickname = null;
    private String pagename = null;
    @Setter
    private String base64Image; // 클라이언트에게 전달될 Base64 인코딩된 이미지

}
