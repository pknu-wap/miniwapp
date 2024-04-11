package com.my.kde_db;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class KdeDbApplication {

	public static void main(String[] args) {
		SpringApplication.run(KdeDbApplication.class, args);
	}

}

//확인 url 주소:  http://localhost:8080/user/create?id=userid&pw=password&nick=nickname&address=address&g=gender
