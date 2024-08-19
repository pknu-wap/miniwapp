package com.my.kde_db.controller;


import com.my.kde_db.dto.Post;
import com.my.kde_db.dto.PostDetails;
import com.my.kde_db.service.PostService;
import com.my.kde_db.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("post")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping(value = "/write")
    public ResponseEntity<String> writePost(@RequestBody Post post, HttpSession session) {
        User loginUser = (User) session.getAttribute("me");
        post.setNumber(loginUser.getNumber());
        if (postService.writePost(post)) {
            return ResponseEntity.ok("Post written successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to write post");
        }
    }

    @GetMapping("/list/{user_number}/{page}")
    public ResponseEntity<List<Post>> getPosts(
            @PathVariable("user_number") int userNumber,
            @PathVariable("page") int page) {
        List<Post> posts = postService.getPostsByUserAndPage(userNumber, page);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/info/{number}/{owner_number}")
    public ResponseEntity<PostDetails> getPostDetails(@PathVariable("number") int postNumber,
                                                      @PathVariable("owner_number") int ownerNumber) {
        PostDetails postDetails = postService.getPostDetails(postNumber, ownerNumber);
        if (postDetails != null) {
            return ResponseEntity.ok(postDetails);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/delete/{p_number}")
    public ResponseEntity<String> deletePost(@PathVariable("p_number") int postNumber) {
        boolean isDeleted = postService.deletePost(postNumber);
        if (isDeleted) {
            return ResponseEntity.ok("Post deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete post");
        }
    }
}