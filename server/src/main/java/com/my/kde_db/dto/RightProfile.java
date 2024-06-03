package com.my.kde_db.dto;


import lombok.Data;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Data
public class RightProfile {
    private int userNumber ;
    private String youtubelink;
    private byte[] image ;
    private String contents;
    private String nickname;
    private String pagename;
    private MultipartFile imageFile;


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
