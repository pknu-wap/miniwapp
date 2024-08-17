package com.my.kde_db.dao;

import com.my.kde_db.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    Optional<UserEntity> findByUsername(String username); // username=id 으로 찾기. 스프링시큐리티때문에 추가됨.
    Optional<UserEntity> findById(String id);

    Optional<UserEntity> findByNickname(String nickname);
}
