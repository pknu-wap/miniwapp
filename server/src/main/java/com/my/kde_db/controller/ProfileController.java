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
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/upload")
    @ResponseBody
    public ResponseEntity<Void> updateProfile(@RequestBody String base64Image, HttpSession session) {
        User loginUser = (User) session.getAttribute("me");
        if (loginUser != null) {
            boolean updateSuccess = leftProfileService.updateProfile(loginUser.getId(), base64Image);
            if (updateSuccess) {
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.internalServerError().build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}


