package com.my.kde_db.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.my.kde_db.service.UserService;
import com.my.kde_db.vo.User;

import javax.servlet.http.HttpSession;
import java.sql.Date;

@Controller
@RequestMapping(value = "user")
//쿼리스트링 방식?
//ex) 로그인 http://localhost:8080/user/login?id=sh&pw=4994
public class UserController {

	
	@Autowired
	UserService userService;
	
	
	@GetMapping("status")
	@ResponseBody
	public String Status(HttpSession session) {
		
		User loginUser =(User)session.getAttribute("me");
		
		if(loginUser != null) {
			//로그인 된 상태
			return "로그인됨";
		}else {
			//로그아웃 상태
			return "로그인안됨";
		}
		
		
		
	}
	
	
	@GetMapping("login")
	@ResponseBody
	public String login(
			@RequestParam(value = "id") String id,
			@RequestParam(value = "password") String password,
			
			
			
			
			HttpSession session
			) {
		
		
		User user = new User();
		user.setId(id);
		user.setPassword(password);
		
		User result = userService.findByIdAndPw(user);
		
		if(result != null) {
			session.setAttribute("me", result);
			return result.getNickname()+ "님 로그인 성공";
		}else {
			return "가입된 계정이 없습니다";
		}
		
		
		
		
	}
	
	@GetMapping("logout")
	@ResponseBody
	public String logout(HttpSession session) {
		
		session.invalidate(); //세션 파기, 반환 타입이 없다
		return "로그아웃 되었습니다";
	}
	
	
	@PostMapping("create")
	@ResponseBody //데이터 리턴하는 ....
	public String create(
				@RequestParam(value = "id") String id,
				@RequestParam(value = "password") String password,
				@RequestParam(value = "name") String name,
				@RequestParam(value = "nickname") String nickname,
				@RequestParam(value = "birthday") Date birthday
			) {
		

		
		User user = new User();
		user.setId(id);
		user.setPassword(password);
		user.setNickname(nickname);
		user.setName(name);
		user.setBirthday(birthday);
		
		//아이디 검증
		User u1 = userService.findById(id);
		if(u1 != null) {
			//이미 가입된 아이디가 존재
			return "이미 가입된 아이디가 존재";
		}
		
		User u2 = userService.findByNickname(nickname);
		if(u2 != null) {
			return "이미 가입된 닉네임이 존재";
		}
		
		
		userService.save(user);
		
		return "ok";
	}
	
	
	

	
	

}
