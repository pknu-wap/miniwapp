package com.my.kde_db.controller;
import com.my.kde_db.service.UserHomeService;
import com.my.kde_db.vo.User;
import com.my.kde_db.dto.UserHome;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

@Controller
public class UserHomeController {

    @Autowired
    UserHomeService userhomeService;
    @GetMapping("userhome")
    @ResponseBody
    public UserHome userhome(HttpSession session) {

        User loginUser =(User)session.getAttribute("me");

        if(loginUser != null) {
            //로그인 된 상태
            return userhomeService.findUserHomeById(loginUser.getId());
        }else {
            //로그아웃 상태
            return null;
        }
    }
}
