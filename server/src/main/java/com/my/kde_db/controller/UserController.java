package com.my.kde_db.controller;

import com.my.kde_db.service.KakaoService;
import com.my.kde_db.service.UserService;
import com.my.kde_db.vo.SimpleUser;
import com.my.kde_db.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping(value = "user")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private KakaoService kakaoService;

	@GetMapping("status")
	@ResponseBody
	public ResponseEntity<Integer> Status(HttpSession session) {
		User loginUser = (User) session.getAttribute("me");
		if (loginUser != null) {
			return ResponseEntity.ok(loginUser.getNumber());
		} else {
			return ResponseEntity.status(401).build();
		}
	}

	@PostMapping("login")
	@ResponseBody
	public ResponseEntity<Void> login(@RequestBody User user, HttpSession session) {
		User result = userService.findByIdAndPw(user);
		if (result != null) {
			session.setAttribute("me", result);
			return ResponseEntity.status(HttpStatus.OK).build();
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	@GetMapping("logout")
	@ResponseBody
	public ResponseEntity<String> logout(HttpSession session) {
		session.invalidate();
		return ResponseEntity.status(HttpStatus.OK).body("로그아웃 성공");
	}

	@PostMapping("create")
	@ResponseBody
	public ResponseEntity<String> create(@RequestBody User user) {
		User u1 = userService.findById(user.getId());
		if (u1 != null) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 가입된 아이디가 존재합니다");
		} else {
			User u2 = userService.findByNickname(user.getNickname());
			if(u2 != null) {
				return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 가입된 닉네임이 존재합니다");
			} else {
				userService.save(user);
				return ResponseEntity.status(HttpStatus.OK).body("회원가입 성공");
			}

		}

	}

	@GetMapping("/kakao")
	@ResponseBody
	public ResponseEntity<Void> kakaoCallback(@AuthenticationPrincipal OAuth2User principal, HttpSession session) {
		SimpleUser user = kakaoService.getUserFromOAuth2User(principal);

		if (user != null) {
			User existingUser = userService.findById(user.getId());
			if (existingUser == null) {
				userService.saveSimpleUser(user);
				session.setAttribute("me", user);  // 회원가입 후 로그인 세션 설정
			} else {
				session.setAttribute("me", existingUser);  // 기존 사용자 로그인 세션 설정
			}
				return ResponseEntity.status(HttpStatus.OK).build();
			} else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}



}