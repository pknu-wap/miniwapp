package com.my.kde_db.controller;

import com.my.kde_db.dto.ChatMessage;
import com.my.kde_db.service.ChatService;
import lombok.RequiredArgsConstructor;
import com.my.kde_db.config.CustomUserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("chat")
public class ChatController {

    private final SimpMessageSendingOperations template;
    private final ChatService chatService;

    @GetMapping()
    public ResponseEntity<List<ChatMessage>> getChatMessages(){
        List<ChatMessage> messages = chatService.getMessages();
        return ResponseEntity.ok().body(messages);
    }

    @MessageMapping("/message")
    public ResponseEntity<Void> receiveMessage(@RequestBody ChatMessage chat, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        chat.setName(customUserDetails.getName());
        chat.setNickname(customUserDetails.getNickname());
        chatService.saveMessage(chat);  // 메시지를 데이터베이스에 저장
        template.convertAndSend("/sub/chatroom/1", chat);  // 메시지를 구독자에게 전송
        return ResponseEntity.ok().build();
    }


}
