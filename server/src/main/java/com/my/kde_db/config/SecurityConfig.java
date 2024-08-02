package com.my.kde_db.config;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http

                .authorizeRequests()
                .antMatchers("/", "/login/**","/error**").permitAll() // 인증 없이 접근 허용
                .anyRequest().authenticated()
                .and()
                .oauth2Login()
                .successHandler((request, response, authentication) -> {
                    response.sendRedirect("/user/kakao");
                })
                .failureHandler((request, response, exception) -> {
                    response.sendRedirect("/user/kakao");
                });

    }
}