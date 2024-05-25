package com.my.kde_db.dao;

import com.my.kde_db.dto.Post;
import com.my.kde_db.dto.PostDetails;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PostMapper {
    boolean writePost (Post post);
    List<Post> findPostsByUserAndPage(int userNumber, int offset);
    PostDetails findPostDetailsByNumber(int postNumber);
}
