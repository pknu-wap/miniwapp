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

    public LeftProfile getProfileById(String id) {
        LeftProfile profile = leftProfileMapper.findById(id);
        if (profile != null && profile.getImage() != null) {
            // 바이트 배열 데이터를 Base64 문자열로 인코딩하여 클라이언트에 제공
            String base64Image = Base64Utils.encode(profile.getImage());
            profile.setBase64Image(base64Image); // Base64 문자열을 별도의 메서드를 통해 설정 (이 부분은 DTO 수정 필요)
        }
        return profile;
    }
    public boolean updateProfile(String id, MultipartFile imageFile, LeftProfile profile) {
        try {
            byte[] imageBytes = imageFile.getBytes();
            profile.setImage(imageBytes); // byte[] 데이터를 설정
            return leftProfileMapper.updateProfile(id, profile);
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }}