package com.my.kde_db.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and() // CORS 설정 추가
                .csrf().disable() // CSRF 보호 비활성화
                .authorizeRequests()
                .antMatchers("/user/login", "/user/create","/user/logout","/user/status","/userhome/**","/error**").permitAll()
                .anyRequest().authenticated()
                .and()
                .oauth2Login()
                .successHandler((request, response, authentication) -> {
                    response.sendRedirect("/user/loginSuccess");
                })
                .failureHandler((request, response, exception) -> {
                    response.sendRedirect("/user/loginFailure");
                });

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}