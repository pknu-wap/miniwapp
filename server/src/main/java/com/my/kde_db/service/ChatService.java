package com.my.kde_db.service;

import com.my.kde_db.dto.ChatMessage;
import com.my.kde_db.dao.ChatMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatMapper chatMapper;

    public void saveMessage(ChatMessage chatMessage) {
        chatMapper.insertMessage(chatMessage);
    }

    public List<ChatMessage> getMessages() {
        return chatMapper.getMessages();
    }
}
