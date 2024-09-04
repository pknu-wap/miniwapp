package com.my.kde_db.dto;

import lombok.Data;

import java.util.Date;

@Data
public class ChatMessage {
    private Long id;
    private String nickname;
    private String name;
    private String message;
    private Date createdAt;


    public ChatMessage(Long id, String name,String nickname, String message, Date createdAt) {
        this.id = id;
        this.nickname = nickname;
        this.name = name;
        this.message = message;
        this.createdAt = createdAt;
    }
}
