package com.my.kde_db.controller;

import com.my.kde_db.dto.LeftProfile;
import com.my.kde_db.dto.ProfileInfo;
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
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/leftprofile")
public class ProfileController {
    @Autowired
    private LeftProfileService leftProfileService;

    @GetMapping("/info/{w_number}")
    public ResponseEntity<Map<String, Object>> getProfile(@PathVariable int w_number, HttpSession session) {
        User loginUser = (User) session.getAttribute("me");

        if (loginUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        LeftProfile profile = leftProfileService.getProfileByWnumber(w_number);
        if (profile != null) {
            Map<String, Object> result = new HashMap<>();
            ProfileInfo profileInfo = new ProfileInfo(loginUser.getNumber(), w_number);
            result.put("profile", profile);
            result.put("profileInfo", profileInfo);

            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
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



