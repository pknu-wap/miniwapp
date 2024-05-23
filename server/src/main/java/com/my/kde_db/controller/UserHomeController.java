package com.my.kde_db.controller;
import com.my.kde_db.service.UserHomeService;
import com.my.kde_db.vo.User;
import com.my.kde_db.dto.UserHome;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

@Controller
public class UserHomeController {

    @Autowired
    UserHomeService userhomeService;
    
    @GetMapping("userhome/{number}")
    @ResponseBody
    public ResponseEntity<UserHome> userhome(@PathVariable int number,HttpSession session) {

        User loginUser =(User)session.getAttribute("me");

        if(loginUser != null) {
            //세션 조회 성공시
            return ResponseEntity.status(HttpStatus.OK).body(userhomeService.findUserHomeByNumber(number));
        }else {
            //세션 조회 실패시
            return ResponseEntity.status(401).build();
        }
    }
}
