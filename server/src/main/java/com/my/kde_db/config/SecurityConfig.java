package com.my.kde_db.config;

import com.my.kde_db.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.http.SessionCreationPolicy;

import javax.servlet.http.HttpServletResponse;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private CustomLogoutHandler customLogoutHandler;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                .and()
                .cors().and() // CORS 설정 추가
                .csrf().disable() // CSRF 보호 비활성화
                .authorizeRequests()
                .antMatchers("/user/login", "/user/create","/user/logout","/user/status","/login**","/error**").permitAll()
                .anyRequest().authenticated()
                .and()
                .exceptionHandling()
                .authenticationEntryPoint((request, response, authException) -> {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
                })
                .and()
                .formLogin()
                .loginProcessingUrl("/user/login")
                .successHandler((request, response, authentication) -> {
                    // 로그인 성공 시 세션에 사용자 정보 저장
                    CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
                    request.getSession().setAttribute("me", userDetails.getUser());
                    response.sendRedirect("/user/loginSuccess");
                })
                .failureHandler((request, response, exception) -> {
                    response.sendRedirect("/user/loginFailure");
                })
                .and()
                .oauth2Login()
                .successHandler((request, response, authentication) -> {
                    response.sendRedirect("/user/loginSuccess");
                })
                .failureHandler((request, response, exception) -> {
                    exception.printStackTrace();
                    response.sendRedirect("/user/loginFailure");
                })
                .and()
                .logout()
                .logoutUrl("/logout")
                .addLogoutHandler(customLogoutHandler)
                .logoutSuccessUrl("/user/logout")
                .invalidateHttpSession(true) // 세션 무효화
                .deleteCookies("JSESSIONID"); // 쿠키 삭제;;
    }
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserDetailsService)
                .passwordEncoder(passwordEncoder());
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
