package com.my.kde_db.controller;

import com.my.kde_db.dto.FriendInfo;
import com.my.kde_db.dto.FriendList;
import com.my.kde_db.dto.UserHome;
import com.my.kde_db.service.FriendListService;
import com.my.kde_db.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Controller
public class FriendListController {

    @Autowired
    FriendListService friendListService;

    @GetMapping("friendlist")
    @ResponseBody
    public ResponseEntity<FriendList> getFriendList(HttpSession session) {
        User loginUser = (User) session.getAttribute("me");

        if (loginUser != null) {
            String userId = loginUser.getId();
            List<FriendInfo> friendList = friendListService.findAllUsersExceptUserId(userId);
            int userCount = friendListService.getUserCountExcludingCurrentUser(userId);

            if (friendList != null && !friendList.isEmpty()) {
                FriendList response = new FriendList();
                response.setData(friendList);
                response.setUsercount(userCount);

                return ResponseEntity.status(HttpStatus.OK).body(response);

            } else {
                // 사용자 정보를 가져오지 못한 경우
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new FriendList());
            }
        } else {
            // 로그인 세션을 찾을 수 없는 경우
            FriendList fls = new FriendList();
            fls.setUsercount(-1);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(fls);
        }
    }
}



