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

    @GetMapping("{owner_number}/{page_number}")
    @ResponseBody
    public ResponseEntity<List<VisitorPost>> getVboard(@PathVariable int owner_number, @PathVariable int page_number) {
        return ResponseEntity.ok(visitorBoardService.findByUNumPNum(owner_number, page_number));
    }

    @PostMapping("post/{owner_number}")
    @ResponseBody
    public ResponseEntity<Void> createPost(@PathVariable int owner_number, @RequestBody VisitorPost visitorPost, HttpSession session) {
        User loginUser = (User) session.getAttribute("me");
        visitorPost.setVisitorNumber(loginUser.getNumber());
        visitorBoardService.createVisitorPost(visitorPost, owner_number);
        return ResponseEntity.status(200).build();
    }

    @PutMapping("post")
    public ResponseEntity<Calendar> updatePost(@RequestBody VisitorPost visitorPost){
        visitorBoardService.updatePost(visitorPost);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("post/{number}")
    public ResponseEntity<Void> deletePost(@PathVariable int number){
        visitorBoardService.deletePost(number);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("comment/{number}")
    @ResponseBody
    public ResponseEntity<Void> creatComment(@RequestBody VisitorComment visitorComment,@PathVariable int number, HttpSession session) {
        User loginUser = (User) session.getAttribute("me");
        visitorBoardService.createComment(visitorComment, loginUser.getNumber(), number);
        return ResponseEntity.status(200).build();

    }

    @PutMapping("comment/{number}")
    public ResponseEntity<Calendar> updateComment(@RequestBody VisitorComment visitorComment,@PathVariable int number){
        visitorBoardService.updateComment(visitorComment,number);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("comment/{number}")
    public ResponseEntity<Void> deleteComment(@PathVariable int number){
        visitorBoardService.deleteComment(number);
        return ResponseEntity.status(HttpStatus.OK).build();
    }


}
