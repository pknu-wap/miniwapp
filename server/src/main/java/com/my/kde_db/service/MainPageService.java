package com.my.kde_db.service;

import com.my.kde_db.dao.MainPageMapper;
import com.my.kde_db.dto.MainPost;
import com.my.kde_db.dto.MainUser;
import com.my.kde_db.utils.Base64Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MainPageService {
    @Autowired
    MainPageMapper mainPageMapper;

    public MainUser getUser(int number){
    MainUser mainuser=mainPageMapper.findUserByNumber(number);
    if (mainuser != null && mainuser.getImage() != null){
        String base64Image = Base64Utils.encode(mainuser.getImage());
        mainuser.setBase64Image(base64Image);
    }
    return mainuser;
    }

    public List<MainPost> getHotPost(){
    return mainPageMapper.findHotPost();
    }

    public List<MainPost> getNewPost(){
        return mainPageMapper.findNewPost();
    }
}
