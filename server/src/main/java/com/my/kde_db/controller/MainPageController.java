package com.my.kde_db.controller;

import com.my.kde_db.dto.MainPost;
import com.my.kde_db.dto.MainUser;
import com.my.kde_db.service.MainPageService;
import com.my.kde_db.vo.CalAndBirth;
import com.my.kde_db.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("mainpage")
public class MainPageController {

    @Autowired
    MainPageService mainPageService;

    @GetMapping("user")
    public ResponseEntity<MainUser> getUser(HttpSession session){
        User loginUser = (User) session.getAttribute("me");
            return ResponseEntity.ok(mainPageService.getUser(loginUser.getNumber()));
    }

    @GetMapping("new_post")
    public ResponseEntity<List<MainPost>> getNewPost(){
            return ResponseEntity.ok(mainPageService.getNewPost());
    }

    @GetMapping("hot_post")
    public ResponseEntity<List<MainPost>> getHotPost(){
            return ResponseEntity.ok(mainPageService.getHotPost());
    }


}
