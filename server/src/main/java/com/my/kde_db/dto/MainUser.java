package com.my.kde_db.dto;

import lombok.Data;

@Data
public class MainUser {
    private String name=null;
    private String image=null; //반환용 base64 인코딩한 이미지
    private int number=0;
}
