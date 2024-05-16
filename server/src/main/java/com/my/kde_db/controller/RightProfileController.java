package com.my.kde_db.controller;

import com.my.kde_db.dto.RightProfile;
import com.my.kde_db.service.RightProfileService;
import com.my.kde_db.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/rightprofile")
public class RightProfileController {
    @Autowired
    private RightProfileService rightProfileService;

    @GetMapping("/info")
    @ResponseBody
    public ResponseEntity<RightProfile> getProfile(HttpSession session) {
        User loginUser = (User) session.getAttribute("me");
        if (loginUser != null) {
            RightProfile profile = rightProfileService.getProfileById(loginUser.getId());
            if (profile != null) {
                return ResponseEntity.ok(profile);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/upload")
    @ResponseBody
    public ResponseEntity<Void> updateProfile(@RequestBody RightProfile updatedProfile, HttpSession session) {
        User loginUser = (User) session.getAttribute("me");
        if (loginUser != null) {
            boolean updateSuccess = rightProfileService.updateProfile(loginUser.getId(), updatedProfile);
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
