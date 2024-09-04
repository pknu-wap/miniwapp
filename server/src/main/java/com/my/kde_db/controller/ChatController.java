package com.my.kde_db.controller;

import com.my.kde_db.dto.ChatMessage;
import com.my.kde_db.service.ChatService;
import com.my.kde_db.vo.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("chat")
public class ChatController {

    private final SimpMessageSendingOperations template;
    private final ChatService chatService;

    @GetMapping
    public ResponseEntity<List<ChatMessage>> getChatMessages(){
        List<ChatMessage> messages = chatService.getMessages();
        return ResponseEntity.ok().body(messages);
    }

    @MessageMapping("/message")
    public ResponseEntity<Void> receiveMessage(@RequestBody ChatMessage chat) {
        // 메시지 타입에 따라 다른 처리
        switch (chat.getType()) {
            case ENTER:
                chat.setMessage(chat.getNickname() + "님이 입장하셨습니다.");
                break;
            case LEAVE:
                chat.setMessage(chat.getNickname() + "님이 퇴장하셨습니다.");
                break;
            case CHAT:
                // 일반 채팅 메시지는 그대로 처리
                break;
        }

        // 메시지를 데이터베이스에 저장 (일반 메시지일 때만 저장, 입/퇴장 메시지는 저장 안할 수 있음)
        if (chat.getType() == ChatMessage.MessageType.CHAT) {
            chatService.saveMessage(chat);
        }

        // 메시지를 구독자에게 전송
        template.convertAndSend("/sub/chatroom/1", chat);

        return ResponseEntity.ok().build();
    }


}
