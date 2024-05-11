package com.my.kde_db.controller;

import com.my.kde_db.dto.LeftProfile;
import com.my.kde_db.service.LeftProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.my.kde_db.service.UserService;
import com.my.kde_db.vo.User;

import javax.servlet.http.HttpSession;
import java.sql.Date;

@Controller
@RequestMapping("/leftprofile")
public class ProfileController {
    @Autowired
    private LeftProfileService leftProfileService;

    @GetMapping("/info")
    @ResponseBody
    public ResponseEntity<LeftProfile> getProfile(HttpSession session) {
        User loginUser = (User) session.getAttribute("me");
        if (loginUser != null) {
            LeftProfile profile = leftProfileService.getProfileById(loginUser.getId());
            return ResponseEntity.ok(profile);
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping("/upload")
    @ResponseBody
    public ResponseEntity<Void> updateProfile(@RequestBody LeftProfile updatedProfile, HttpSession session) {
        User loginUser = (User) session.getAttribute("me");
        if (loginUser != null) {
            boolean updateSuccess = leftProfileService.updateProfile(loginUser.getId(), updatedProfile);
            if (updateSuccess) {
                return ResponseEntity.ok().build();  // 성공 응답, 메시지 없음
            } else {
                return ResponseEntity.internalServerError().build();  // 내부 서버 오류 응답
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();  // 권한 없음 응답
        }
    }
}


