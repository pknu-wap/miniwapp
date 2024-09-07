package com.my.kde_db.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Data
public class FriendInfo {
    private int number = 0;
    private String name = null;

    private String nickname =null;

    private byte[] image; // 이 필드는 직접 바인딩하지 않음

    private int state;

}
