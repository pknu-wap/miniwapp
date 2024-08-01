package com.my.kde_db.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.my.kde_db.service.KakaoOAuth2Service;
import com.my.kde_db.service.UserService;
import com.my.kde_db.vo.SimpleUser;
import com.my.kde_db.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping(value = "user")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private KakaoOAuth2Service kakaoOAuth2Service;

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

			userService.save(user);
			return ResponseEntity.status(HttpStatus.OK).body("회원가입 성공");

		}

	}

	@GetMapping("/oauth/kakao/callback")
	public ResponseEntity<Void> kakaoCallback(@RequestParam String code, HttpSession session) {
		try {
			String accessToken = kakaoOAuth2Service.getAccessToken(code);
			String userInfo = kakaoOAuth2Service.getUserInfo(accessToken);

			ObjectMapper objectMapper = new ObjectMapper();
			JsonNode jsonNode = objectMapper.readTree(userInfo);
			String kakaoId = jsonNode.get("id").asText();
			String name = jsonNode.get("properties").get("nickname").asText();

			User user = userService.findById(kakaoId);
			if (user == null) {
				SimpleUser user1 = new SimpleUser();
				user1.setId(kakaoId);
				user1.setName(name);
				userService.saveSimpleUser(user1);
				session.setAttribute("me", user1);  // 회원가입 후 로그인 세션 설정
			} else {
				session.setAttribute("me", user);  // 기존 사용자 로그인 세션 설정
			}
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			e.printStackTrace(); // 콘솔에 예외 로그 출력
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}


}