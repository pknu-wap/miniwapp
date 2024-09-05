package com.my.kde_db.dao;

import com.my.kde_db.dto.MainPost;
import com.my.kde_db.dto.MainUser;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MainPageMapper {
    MainUser findUserByNumber(int number);

    List<MainPost> findNewPost();

    List<MainPost> findHotPost();
}
