package com.my.kde_db.dao;

import com.my.kde_db.entity.PostCommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface PostCommentRepository extends JpaRepository<PostCommentEntity, Integer> {

    @Query("SELECT c FROM PostCommentEntity c JOIN UserEntity u ON c.userNumber = u.number WHERE c.postNumber = :postNumber")
    List<PostCommentEntity> findCommentsByPostNumber(@Param("postNumber") int postNumber);

    @Modifying
    @Query("DELETE FROM PostCommentEntity c WHERE c.cNumber = :commentId AND c.postNumber = :postId")
    void deleteComment(@Param("commentId") int commentId, @Param("postId") int postId);
}
