package com.my.kde_db.service;

import com.my.kde_db.dao.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.kde_db.vo.User;

@Service
public class UserService {

	
	@Autowired
	UserMapper userMapper;
	
	public User findByIdAndPw(User user) {
		return userMapper.findByIdAndPw(user);
		
	}
	
	public User findById(String  id) {
		return userMapper.findById(id);
		
	}
	
	public User findByNickname(String nickname) {
		return userMapper.findByNickname(nickname);
	}
	
	
	
	public void save(User user) {
		
		userMapper.save(user);
		
	}
	

	public User getUser2() {


		return userMapper.getUser2();

	}
}
