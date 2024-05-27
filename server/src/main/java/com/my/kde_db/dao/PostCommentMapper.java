package com.my.kde_db.dao;

import com.my.kde_db.dto.PostComment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface PostCommentMapper {
    boolean writeComment(PostComment postComment);

    boolean deleteComment(@Param("commentId") int commentId, @Param("postId") int postId, @Param("userId") int userId);
}

