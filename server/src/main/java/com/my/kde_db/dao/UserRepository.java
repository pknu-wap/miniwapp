package com.my.kde_db.dao;

import com.my.kde_db.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    Optional<UserEntity> findById(String id);

    Optional<UserEntity> findByNickname(String nickname);
}
