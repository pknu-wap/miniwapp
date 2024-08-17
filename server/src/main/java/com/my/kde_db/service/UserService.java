package com.my.kde_db.service;

import com.my.kde_db.dao.UserRepository;
import com.my.kde_db.entity.UserEntity;
import com.my.kde_db.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	@Autowired
	public UserService(PasswordEncoder passwordEncoder) {
		this.passwordEncoder = passwordEncoder;
	}

	public Optional<User> findById(String id) {
		return userRepository.findById(id).map(this::convertToDTO);
	}

	public Optional<User> findByNickname(String nickname) {
		return userRepository.findByNickname(nickname).map(this::convertToDTO);
	}

	public void save(User user) {
		UserEntity userEntity = convertToEntity(user);
		userEntity.setPassword(passwordEncoder.encode(user.getPassword()));  // 비밀번호 암호화
		userRepository.save(userEntity);
	}

	public Optional<User> getUser2() {
		return userRepository.findById(2).map(this::convertToDTO);
	}

	private User convertToDTO(UserEntity userEntity) {
		User user = new User();
		user.setNumber(userEntity.getNumber());
		user.setId(userEntity.getId());
		user.setNickname(userEntity.getNickname());
		user.setName(userEntity.getName());
		user.setBirthday(userEntity.getBirthday());
		user.setPassword(userEntity.getPassword());
		return user;
	}

	private UserEntity convertToEntity(User user) {
		UserEntity userEntity = new UserEntity();
		userEntity.setNumber(user.getNumber());
		userEntity.setId(user.getId());
		userEntity.setNickname(user.getNickname());
		userEntity.setName(user.getName());
		userEntity.setBirthday(user.getBirthday());
		return userEntity;
	}
}
