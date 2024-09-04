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
    private Integer state;
    // 보낸사람의 접속상태 : 0 접속, 1 퇴장


    public ChatMessage(Long id, String name,String nickname, String message, Date createdAt, Integer state) {
        this.id = id;
        this.nickname = nickname;
        this.name = name;
        this.message = message;
        this.createdAt = createdAt;
        this.state = state;
    }
}
