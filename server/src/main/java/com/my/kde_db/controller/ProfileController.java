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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.sql.Date;

@RestController
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

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<String> updateProfile(@RequestParam("imageFile") MultipartFile imageFile,
                                                @ModelAttribute LeftProfile profile, HttpSession session) {
        User loginUser = (User) session.getAttribute("me");
        if (loginUser != null) {
            boolean updateSuccess = leftProfileService.updateProfile(loginUser.getId(), imageFile, profile);
            if (updateSuccess) {
                return ResponseEntity.ok("Profile updated successfully");
            } else {
                return ResponseEntity.badRequest().body("Failed to update profile");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }
}



