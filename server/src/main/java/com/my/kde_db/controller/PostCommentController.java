package com.my.kde_db.controller;

import com.my.kde_db.dto.PostComment;
import com.my.kde_db.service.PostCommentService;
import com.my.kde_db.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("postco")
public class PostCommentController {

    @Autowired
    private PostCommentService postCommentService;

    @PostMapping("/write/{postOwnerUserId},{postId}")
    public ResponseEntity<String> writeComment(@PathVariable("postOwnerUserId") int postOwnerUserId,
                                               @PathVariable("postId") int postId,
                                               @RequestBody PostComment comment,
                                               HttpSession session) {
        User loginUser = (User) session.getAttribute("me");
        if (loginUser != null) {
            comment.setUser_number(loginUser.getNumber()); // 세션에서 사용자 번호 설정
            comment.setPost_number(postId); // 게시글 번호 설정
            if (postCommentService.writeComment(comment)) {
                return ResponseEntity.ok("Comment added successfully");
            } else {
                return ResponseEntity.badRequest().body("Failed to add comment");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
    }

    @DeleteMapping("/delete/{commentId}/{postId}")
    public ResponseEntity<String> deleteComment(@PathVariable("commentId") int commentId,
                                                @PathVariable("postId") int postId,
                                                HttpSession session) {
        User loginUser = (User) session.getAttribute("me");
        if (loginUser != null) {
            boolean isDeleted = postCommentService.deleteComment(commentId, postId, loginUser.getNumber());
            if (isDeleted) {
                return ResponseEntity.ok("Comment deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to delete this comment");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
    }


}