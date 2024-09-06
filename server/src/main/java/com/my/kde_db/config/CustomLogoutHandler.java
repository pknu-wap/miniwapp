package com.my.kde_db.config;

import com.my.kde_db.dao.UserMapper;
import com.my.kde_db.service.UserService;
import com.my.kde_db.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
@Component
public class CustomLogoutHandler implements LogoutHandler {
    private final String kakaoLogoutUrl = "https://kapi.kakao.com/v1/user/logout";
    private final HttpSession session;

    private final UserMapper userMapper;  // UserMapper 필드 추가

    @Autowired
    public CustomLogoutHandler(HttpSession session, UserMapper userMapper) {  // UserMapper 생성자 주입
            this.session = session;
            this.userMapper = userMapper;
        }

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        System.out.println("로그아웃 핸들러 호출됨");
        User logoutUser = (User) session.getAttribute("me");
        if (logoutUser != null) {
            logoutUser.setState(0);
            userMapper.savestate(logoutUser);
            System.out.println("로그아웃 상태 저장된 유저: "+logoutUser.getName());
        }
        
        String accessToken = (String) session.getAttribute("accessToken");
        if (authentication != null && accessToken != null) {

            // 카카오 로그아웃 API 호출
            try {
                URL url = new URL(kakaoLogoutUrl);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("POST");
                conn.setRequestProperty("Authorization", "Bearer " + accessToken);
                int responseCode = conn.getResponseCode(); // API 호출
                if (responseCode == HttpURLConnection.HTTP_OK) {
                    System.out.println("카카오 로그아웃 성공");
                } else {
                    System.out.println("카카오 로그아웃 실패, 응답 코드: " + responseCode);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}




