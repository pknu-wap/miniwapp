package com.my.kde_db.dao;

import com.my.kde_db.dto.FriendInfo;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface FriendListMapper {
    List<FriendInfo> findAllUsersExceptUserId(String userId);
    int getUserCountExcludingCurrentUser(String userId);
}