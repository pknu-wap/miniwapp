package com.my.kde_db.dao;

import com.my.kde_db.dto.PostInfo;
import com.my.kde_db.dto.UserHome;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserHomeMapper {
    UserHome findById(String id);
    List<PostInfo> findLatestPost(int number);
}
