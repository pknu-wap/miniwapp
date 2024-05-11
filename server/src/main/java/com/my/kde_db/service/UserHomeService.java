package com.my.kde_db.service;

import com.my.kde_db.dao.UserHomeMapper;
import com.my.kde_db.dto.UserHome;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserHomeService {



    @Autowired
    UserHomeMapper userhomeMapper;
    public UserHome findUserHomeById(String  id) {
        UserHome userhome=new UserHome();
        userhome=userhomeMapper.findById(id);
        if (userhome.getPagename()==null) userhome.setPagename(userhome.getName()+"의 미니홈피");
        userhome.setPosts(userhomeMapper.findLatestPost(userhome.getNumber()));
        return userhome;
    }

}
