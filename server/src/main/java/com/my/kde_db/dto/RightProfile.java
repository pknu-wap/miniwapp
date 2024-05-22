package com.my.kde_db.dto;


import lombok.Data;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Data
public class RightProfile {
    private int userNumber = 0;
    private String youtubelink;
    private byte[] image ;
    private String contents;
    private String nickname;
    private String pagename;
    private MultipartFile imageFile;
    @Setter
    private String base64Image; // 클라이언트에게 전달될 Base64 인코딩된 이미지

    public void setBase64Image(String base64Image) {
        this.base64Image = base64Image;
    }
    public void setImageFile(MultipartFile imageFile) {
        this.imageFile = imageFile;
    }

    public MultipartFile getImageFile() {
        return imageFile;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
}}
