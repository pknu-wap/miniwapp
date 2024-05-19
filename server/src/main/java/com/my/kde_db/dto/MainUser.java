package com.my.kde_db.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class MainUser {
    private String name=null;
    @JsonIgnore
    private byte[] image=null; //조회용 이미지
    private String base64Image=null; //반환용 base64 인코딩한 이미지
    private int number=0;
}
