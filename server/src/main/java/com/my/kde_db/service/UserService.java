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
	@Autowired
	private PasswordEncoder passwordEncoder;

	public Optional<User> findByIdAndPw(User user) {
		// 1. 사용자 ID로 UserEntity를 찾습니다.
		Optional<UserEntity> userEntity = userRepository.findById(user.getId());

		// 2. UserEntity가 존재하고, 사용자가 입력한 비밀번호가 데이터베이스에 저장된 암호화된 비밀번호와 일치하는지 확인합니다.
		if (userEntity.isPresent() && passwordEncoder.matches(user.getPassword(), userEntity.get().getPassword())) {
			// 3. 비밀번호가 일치하면 UserEntity를 User DTO로 변환하여 반환합니다.
			return Optional.of(convertToDTO(userEntity.get()));
		} else {
			// 4. 비밀번호가 일치하지 않거나 사용자 정보가 없으면 빈 Optional을 반환합니다.
			return Optional.empty();
		}
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
		return user;
	}

	private UserEntity convertToEntity(User user) {
		UserEntity userEntity = new UserEntity();
		userEntity.setNumber(user.getNumber());
		userEntity.setId(user.getId());
		userEntity.setPassword(user.getPassword());
		userEntity.setNickname(user.getNickname());
		userEntity.setName(user.getName());
		userEntity.setBirthday(user.getBirthday());
		return userEntity;
	}
}
