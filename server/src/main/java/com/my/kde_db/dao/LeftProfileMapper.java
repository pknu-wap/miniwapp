package com.my.kde_db.dao;


import com.my.kde_db.dto.LeftProfile;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LeftProfileMapper {
    LeftProfile findByWnumber(int w_number);
    boolean updateProfile(String id, LeftProfile profile);

}