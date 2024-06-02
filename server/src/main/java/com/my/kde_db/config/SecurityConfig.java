package com.my.kde_db.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and() // CORS 설정 추가
                .csrf().disable() // CSRF 보호 비활성화
                .authorizeRequests()
                .anyRequest().permitAll(); // 모든 경로를 인증 없이 접근 가능하도록 설정
    }
}