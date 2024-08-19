package com.my.kde_db.dao;

import com.my.kde_db.entity.PostEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface PostRepository extends JpaRepository<PostEntity, Integer> {

    // Pageable을 사용하여 페이징을 처리합니다.
    @Query("SELECT p FROM PostEntity p WHERE p.userNumber = :userNumber ORDER BY p.date DESC")
    Page<PostEntity> findPostsByUserAndPage(@Param("userNumber") int userNumber, Pageable pageable);

    @Query("SELECT p FROM PostEntity p JOIN UserEntity u ON p.userNumber = u.number WHERE p.pNumber = :postNumber AND p.userNumber = :ownerNumber")
    PostEntity findPostDetailsByNumber(@Param("postNumber") int postNumber, @Param("ownerNumber") int ownerNumber);

    @Modifying
    @Transactional
    @Query("UPDATE PostEntity p SET p.viewCount = p.viewCount + 1 WHERE p.pNumber = :postNumber")
    void incrementViewCount(@Param("postNumber") int postNumber);
}
