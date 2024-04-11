package com.my.kde_db.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {
	
	@GetMapping("/detailUser")
	public String detailUser(
			
			@RequestParam(value = "uid") String id,
			Model model
			
			){
		String nickname = "coding";
		String tel = "01054284075";
		
		model.addAttribute("nick", nickname); //"nick"이 키값 nickname은 밸류값 이하동일 , nick 이라는 키 값으로 nickname을 뷰에 전달
		model.addAttribute("tel",tel);
		
		return "home";
	}
	
	@GetMapping("saveUser")
	@ResponseBody
	public String saveUser(
			
			@RequestParam (value = "uid") String id , 
			@RequestParam (value = "upw") String pw
			) {
		System.out.println(id);
		System.out.println(pw);
		
		
		return "ok";
	}
	
	
	
	@GetMapping("/") // import 단축키는 컨트롤 시프트 
	@ResponseBody //데이터 주는 놈
	public String home() {
		
		return "home";
	}
	

	
}
