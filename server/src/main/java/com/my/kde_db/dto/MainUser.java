package com.my.kde_db.dto;
import lombok.Data;

@Data
public class MainUser {
    private String name=null;
    private byte[] image=null; //응답할때 자동으로 base64인코딩되어 보내짐
    private int number=0;
}
