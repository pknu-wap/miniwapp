package com.my.kde_db.dao;

import com.my.kde_db.entity.FriendInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FriendInfoRepository extends JpaRepository<FriendInfoEntity, Integer> {

    @Query("SELECT f FROM FriendInfoEntity f WHERE f.userId != :userId ORDER BY f.name")
    List<FriendInfoEntity> findAllUsersExceptUserId(@Param("userId") String userId);

    @Query("SELECT COUNT(f) FROM FriendInfoEntity f WHERE f.id != :userId")
    int getUserCountExcludingCurrentUser(@Param("userId") String userId);
}
