package com.my.kde_db.dao;

import com.my.kde_db.dto.VisitorComment;
import com.my.kde_db.dto.VisitorPost;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface VisitorBoardMapper {
    List<VisitorPost> findByUNumPNum(int owner_number, int offset);

    void createVisitorPost(@Param("visitorPost")VisitorPost visitorPost, @Param("owner_number") int owner_number);

    void updatePost(VisitorPost visitorPost);

    void deletePost(int number);

    void createComment(@Param("visitorComment") VisitorComment visitorComment, @Param("owner_number") int owner_number,@Param("number") int number);

    void updateComment(@Param("visitorComment") VisitorComment visitorComment, @Param("number") int number);

    void deleteComment(int number);

}
