package com.my.kde_db.service;

import com.my.kde_db.dao.FriendListMapper;
import com.my.kde_db.dto.FriendInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FriendListService {

    @Autowired
    FriendListMapper friendListMapper;

    public List<FriendInfo> findAllUsersExceptUserId(String userId) {
        return friendListMapper.findAllUsersExceptUserId(userId);
    }

    public int getUserCountExcludingCurrentUser(String userId) {
        return friendListMapper.getUserCountExcludingCurrentUser(userId);
    }
}
