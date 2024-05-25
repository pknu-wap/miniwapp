package com.my.kde_db.controller;

import com.my.kde_db.dto.VisitorComment;
import com.my.kde_db.dto.VisitorPost;
import com.my.kde_db.service.VisitorBoardService;
import com.my.kde_db.vo.Calendar;
import com.my.kde_db.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("vboard")
public class VisitorBoardController {

    @Autowired
    VisitorBoardService visitorBoardService;

    @GetMapping("view/{owner_number}/{page_number}")
    @ResponseBody
    public ResponseEntity<List<VisitorPost>> getVboard(@PathVariable int owner_number, @PathVariable int page_number, HttpSession session) {
        User loginUser = (User) session.getAttribute("me");
        if (loginUser != null) {
            return ResponseEntity.ok(visitorBoardService.findByUNumPNum(owner_number, page_number));
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping("create_post/{owner_number}")
    @ResponseBody
    public ResponseEntity<Void> createPost(@PathVariable int owner_number, @RequestBody VisitorPost visitorPost, HttpSession session) {
        User loginUser = (User) session.getAttribute("me");
        if (loginUser != null) {
            visitorPost.setVisitorNumber(loginUser.getNumber());
            visitorBoardService.createVisitorPost(visitorPost, owner_number);
            return ResponseEntity.status(200).build();
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    @PutMapping("update_post")
    public ResponseEntity<Calendar> updatePost(@RequestBody VisitorPost visitorPost, HttpSession session){
        User loginUser = (User) session.getAttribute("me");
        if (loginUser != null) {
            visitorBoardService.updatePost(visitorPost);
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    @DeleteMapping("delete_post/{number}")
    public ResponseEntity<Void> deletePost(@PathVariable int number,HttpSession session){
        User loginUser = (User) session.getAttribute("me");
        if (loginUser != null) {
            visitorBoardService.deletePost(number);
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping("create_comment/{number}")
    @ResponseBody
    public ResponseEntity<Void> creatComment(@RequestBody VisitorComment visitorComment,@PathVariable int number, HttpSession session) {
        User loginUser = (User) session.getAttribute("me");
        if (loginUser != null) {
            visitorBoardService.createComment(visitorComment, loginUser.getNumber(), number);
            return ResponseEntity.status(200).build();
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    @PutMapping("update_comment/{number}")
    public ResponseEntity<Calendar> updateComment(@RequestBody VisitorComment visitorComment,@PathVariable int number, HttpSession session){
        User loginUser = (User) session.getAttribute("me");
        if (loginUser != null) {
            visitorBoardService.updateComment(visitorComment,number);
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    @DeleteMapping("delete_comment/{number}")
    public ResponseEntity<Void> deleteComment(@PathVariable int number,HttpSession session){
        User loginUser = (User) session.getAttribute("me");
        if (loginUser != null) {
            visitorBoardService.deleteComment(number);
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(401).build();
        }
    }


}
