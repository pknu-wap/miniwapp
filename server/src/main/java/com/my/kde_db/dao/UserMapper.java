package com.my.kde_db.dao;

import com.my.kde_db.vo.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {


    User findById(String id);

    User findByNickname(String nickname);

    void save(User user);

    //void savestate(User user);

}
