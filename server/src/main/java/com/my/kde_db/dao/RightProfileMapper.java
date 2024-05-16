package com.my.kde_db.dao;

import com.my.kde_db.dto.RightProfile;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RightProfileMapper {


        RightProfile findById(String id);
        boolean updateProfile(String id, RightProfile profile);
    }


