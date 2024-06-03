package com.my.kde_db.dao;

import com.my.kde_db.dto.RightProfile;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RightProfileMapper {


     RightProfile findByWnumber(int w_number);

     boolean updateUser(RightProfile profile);

    boolean upsertProfile(RightProfile profile);
    }


