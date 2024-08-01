package com.my.kde_db.dao;

import com.my.kde_db.vo.SimpleUser;
import com.my.kde_db.vo.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    User findByIdAndPw(User user);

    User findById(String id);

    User findByNickname(String nickname);

    void save(User user);

    void saveSimpleUser(SimpleUser user);

    User getUser2();
}
