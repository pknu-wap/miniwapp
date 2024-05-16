package com.my.kde_db.service;

import com.my.kde_db.dao.RightProfileMapper;
import com.my.kde_db.dto.RightProfile;
import com.my.kde_db.utils.Base64Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RightProfileService {
    @Autowired
    private RightProfileMapper rightProfileMapper;

    public RightProfile getProfileById(String id) {
        RightProfile profile = rightProfileMapper.findById(id);
        if (profile != null && profile.getImage() != null) {
            String base64Image = Base64Utils.encode(profile.getImage());
            profile.setBase64Image(base64Image);
        }
        return profile;
    }

    public boolean updateProfile(String id, String base64Image) {
        RightProfile profile = new RightProfile();
        byte[] imageBytes = Base64Utils.decode(base64Image);
        profile.setImage(imageBytes);
        return rightProfileMapper.updateProfile(id, profile);
    }
}
