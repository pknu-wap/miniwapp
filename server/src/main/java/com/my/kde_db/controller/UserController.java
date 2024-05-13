package com.my.kde_db.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.my.kde_db.service.UserService;
import com.my.kde_db.vo.User;

import javax.servlet.http.HttpSession;
import java.sql.Date;

import static org.eclipse.jdt.internal.compiler.parser.Parser.name;

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
	
	
	@PostMapping("login")
	@ResponseBody
	public String login(@RequestBody User user, HttpSession session) {

		User result = userService.findByIdAndPw(user);
		
		if(result != null) {
			session.setAttribute("me", result);
			return String.valueOf(result.getNumber());
		}else {
			return "로그인에 실패했습니다";
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
	public String create(@RequestBody User user) {
        String result = "ok";
		
		//아이디 검증
		User u1 = userService.findById(user.getId());
		if(u1 != null) {
			//이미 가입된 아이디가 존재
            result = "이미 가입된 아이디가 존재";
        } else {
            User u2 = userService.findByNickname(user.getNickname());
            if(u2 != null) {
                result = "이미 가입된 닉네임이 존재";
            } else {
                userService.save(user);
            }
        }

        return result;
    }

}
