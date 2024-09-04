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
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

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
                .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                .and()
                .cors().configurationSource(request -> {
                    var corsConfig = new CorsConfiguration();
                    corsConfig.setAllowedOrigins(List.of("http://localhost:3000", "https://miniwapp.netlify.app"));
                    corsConfig.setAllowedMethods(List.of("*"));
                    corsConfig.setAllowedHeaders(List.of("*"));
                    corsConfig.setAllowCredentials(true);
                    return corsConfig;
                })
                .and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/user/login", "/user/create", "/user/logout", "/user/status", "/login**", "/error**", "/ws/**","/chat/**").permitAll()
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
                    response.sendRedirect("https://miniwapp.netlify.app/redirection/success");
                })
                .failureHandler((request, response, exception) -> {
                    exception.printStackTrace();
                    response.sendRedirect("https://miniwapp.netlify.app/redirection/fail");
                })
                .and()
                .logout()
                .logoutUrl("/logout")
                .addLogoutHandler(customLogoutHandler)
                .logoutSuccessUrl("/user/logout")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID");
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
