package com.my.kde_db.service;

import com.my.kde_db.dao.LeftProfileMapper;
import com.my.kde_db.dto.LeftProfile;
import com.my.kde_db.utils.Base64Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LeftProfileService {
    @Autowired
    private LeftProfileMapper leftProfileMapper;

    public LeftProfile getProfileById(String id) {
        LeftProfile profile = leftProfileMapper.findById(id);
        if (profile.getImage() != null && !profile.getImage().isEmpty()) {
            // 디코딩하여 바이너리 데이터를 실제 사용할 수 있게 함
            byte[] imageBytes = Base64Utils.decode(profile.getImage());
            profile.setImage(Base64Utils.encode(imageBytes)); // 재인코딩(선택적)
        }
        return profile;
    }

    public boolean updateProfile(String id, LeftProfile profile) {
        if (profile.getImage() != null && !profile.getImage().isEmpty()) {
            // 인코딩하여 데이터베이스에 저장
            byte[] imageBytes = Base64Utils.decode(profile.getImage());
            profile.setImage(Base64Utils.encode(imageBytes)); // 데이터베이스 저장 전에 재인코딩
        }
        return leftProfileMapper.updateProfile(id, profile);
    }
}