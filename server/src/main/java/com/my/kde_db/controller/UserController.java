package com.my.kde_db.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.my.kde_db.service.UserService;
import com.my.kde_db.vo.User;

import javax.servlet.http.HttpSession;
import java.sql.Date;

import static org.eclipse.jdt.internal.compiler.parser.Parser.name;

@Controller
@RequestMapping(value = "user")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@GetMapping("status")
	@ResponseBody
	public ResponseEntity<Integer> Status(HttpSession session) {
		
		User loginUser =(User)session.getAttribute("me");
		
		if(loginUser != null) {
			//로그인 된 상태
			return ResponseEntity.ok(loginUser.getNumber());
		}else {
			//로그아웃 상태
			return ResponseEntity.status(401).build();
		}
		
	}
	
	
	@PostMapping("login")
	@ResponseBody
	public ResponseEntity<Void> login(@RequestBody User user, HttpSession session) {

		User result = userService.findByIdAndPw(user);
		
		if(result != null) {
			session.setAttribute("me", result);
			return ResponseEntity.status(HttpStatus.OK).build();
		}else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); //401코드 반환
		}
	}
	
	@GetMapping("logout")
	@ResponseBody
	public ResponseEntity<String> logout(HttpSession session) {
		
		session.invalidate(); //세션 파기, 반환 타입이 없다
		return ResponseEntity.status(HttpStatus.OK).body("로그아웃 성공");
	}
	
	
	@PostMapping("create")
	@ResponseBody //데이터 리턴하는 ....
	public ResponseEntity<String> create(@RequestBody User user) {
		
		//아이디 검증
		User u1 = userService.findById(user.getId());
		if(u1 != null) {
			//이미 가입된 아이디가 존재
			return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 가입된 아이디가 존재합니다"); //409코드반환
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

}
