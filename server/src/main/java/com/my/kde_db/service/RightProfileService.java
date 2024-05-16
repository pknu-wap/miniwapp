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
        if (profile.getImage() != null && !profile.getImage().isEmpty()) {

            byte[] imageBytes = Base64Utils.decode(profile.getImage());
            profile.setImage(Base64Utils.encode(imageBytes));
        }
        return profile;
    }

    public boolean updateProfile(String id, RightProfile profile) {
        if (profile.getImage() != null && !profile.getImage().isEmpty()) {

            byte[] imageBytes = Base64Utils.decode(profile.getImage());
            profile.setImage(Base64Utils.encode(imageBytes));
        }
        return rightProfileMapper.updateProfile(id, profile);
    }
}
