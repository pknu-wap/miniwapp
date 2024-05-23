package com.my.kde_db.service;

import com.my.kde_db.dao.LeftProfileMapper;
import com.my.kde_db.dto.LeftProfile;
import com.my.kde_db.utils.Base64Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.Base64;

@Service
public class LeftProfileService {
    @Autowired
    private LeftProfileMapper leftProfileMapper;


    public LeftProfile getProfileByWnumber(int w_number) {
        LeftProfile profile = leftProfileMapper.findByWnumber(w_number);
        if (profile != null && profile.getImage() != null) {

        }
        return profile;
    }
    public boolean updateProfile(String id, MultipartFile imageFile, LeftProfile profile) {
        try {
            // 이미지 파일이 제공되었는지 확인하고, 제공된 경우에만 이미지 데이터 업데이트
            if (imageFile != null && !imageFile.isEmpty()) {
                byte[] imageBytes = imageFile.getBytes();
                profile.setImage(imageBytes); // byte[] 데이터를 설정
            } else {
                // 이미지 파일이 제공되지 않은 경우 이미지 데이터는 업데이트하지 않음
                profile.setImage(null);
            }
            return leftProfileMapper.updateProfile(id, profile);
        } catch (IOException e) {
            System.err.println("Error processing image file: " + e.getMessage());
            return false;
        }
    }}