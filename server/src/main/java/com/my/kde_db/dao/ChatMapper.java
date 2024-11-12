package com.my.kde_db.dao;

import com.my.kde_db.dto.ChatMessage;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ChatMapper {

    // 채팅 메시지를 데이터베이스에 저장하는 메서드
    void insertMessage(ChatMessage chatMessage);

    // 모든 채팅 메시지를 가져오는 메서드
    List<ChatMessage> getMessages();
}
