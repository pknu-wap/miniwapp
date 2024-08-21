package com.my.kde_db.dao;

import com.my.kde_db.entity.UserHomeEntity;
import com.my.kde_db.entity.PostInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserHomeRepository extends JpaRepository<UserHomeEntity, Integer> {

    @Query("SELECT u FROM UserHomeEntity u WHERE u.number = :number")
    UserHomeEntity findByNumber(int number);

    @Query("SELECT p FROM PostInfoEntity p WHERE p.user.number = :number ORDER BY p.number DESC")
    List<PostInfoEntity> findLatestPost(int number);
}
