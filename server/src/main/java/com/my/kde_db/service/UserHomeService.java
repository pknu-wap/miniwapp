package com.my.kde_db.service;

import com.my.kde_db.dao.UserHomeMapper;
import com.my.kde_db.dto.UserHome;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserHomeService {

    @Autowired
    UserHomeMapper userhomeMapper;
    public UserHome findUserHomeByNumber(int number) {
        UserHome userhome=new UserHome();
        userhome=userhomeMapper.findByNumber(number);
        userhome.setPosts(userhomeMapper.findLatestPost(number));
        return userhome;
    }

}
