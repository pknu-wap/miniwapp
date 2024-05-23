package com.my.kde_db.service;

import com.my.kde_db.dao.RightProfileMapper;
import com.my.kde_db.dto.RightProfile;
import com.my.kde_db.utils.Base64Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class RightProfileService {
    @Autowired
    private RightProfileMapper rightProfileMapper;

    public RightProfile getProfileByNumber(int w_number) {
        RightProfile profile = rightProfileMapper.findByWnumber(w_number);
        if (profile != null && profile.getImage() != null) {

        }
        return profile;
    }

    @Transactional
    public boolean updateProfile(RightProfile profile, MultipartFile imageFile) {
        try {
            if (imageFile != null && !imageFile.isEmpty()) {
                byte[] imageBytes = imageFile.getBytes();
                profile.setImage(imageBytes);
            }
            return updateUserTable(profile) && upsertProfileTable(profile);
        } catch (IOException e) {
            System.err.println("Error processing image file: " + e.getMessage());
            return false;
        }
    }

    private boolean updateUserTable(RightProfile profile) {
        return rightProfileMapper.updateUser(profile);
    }

    private boolean upsertProfileTable(RightProfile profile) {
        return rightProfileMapper.upsertProfile(profile);
        }
    }

