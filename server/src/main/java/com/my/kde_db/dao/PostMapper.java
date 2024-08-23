package com.my.kde_db.dao;

import com.my.kde_db.dto.Post;
import com.my.kde_db.dto.PostComment;
import com.my.kde_db.dto.PostDetails;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PostMapper {
    boolean writePost (Post post);
    List<Post> findPostsByUserAndPage(int userNumber, int offset);

    PostDetails findPostDetailsByNumber(@Param("postNumber") int postNumber, @Param("ownerNumber") int ownerNumber);
    List<PostComment> findCommentsByPostNumber(int postNumber);
    Post findPostById(int postNumber);

    boolean deletePost(int postNumber);

    void incrementViewCount(int postNumber);
}
