package com.my.kde_db.controller;

import com.my.kde_db.dto.RightProfile;
import com.my.kde_db.service.RightProfileService;
import com.my.kde_db.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
@RestController
@RequestMapping("/rightprofile")
public class RightProfileController {
    @Autowired
    private RightProfileService rightProfileService;

    @GetMapping("/info/{w_number}")
    public ResponseEntity<RightProfile> getProfile(@PathVariable int w_number) {
        RightProfile profile = rightProfileService.getProfileByNumber(w_number);
        if (profile != null) {
            return ResponseEntity.ok(profile);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<String> updateProfile(@RequestParam("imageFile") MultipartFile imageFile,
                                                @ModelAttribute RightProfile profile, HttpSession session) {
        User loginUser = (User) session.getAttribute("me");
        profile.setUserNumber(loginUser.getNumber());  // User의 number를 Profile의 userNumber에 설정
        boolean updateSuccess = rightProfileService.updateProfile(profile, imageFile);
        if (updateSuccess) {
            return ResponseEntity.ok("Profile updated successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to update profile");
        }
    }
}