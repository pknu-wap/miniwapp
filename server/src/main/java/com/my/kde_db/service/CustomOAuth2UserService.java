package com.my.kde_db.service;

import com.my.kde_db.dao.UserMapper;
import com.my.kde_db.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Map;
import java.util.UUID;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private HttpSession session;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = super.loadUser(userRequest);

        // 카카오 사용자 정보 가져오기
        Map<String, Object> attributes = oauth2User.getAttributes();
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

        String accessToken = userRequest.getAccessToken().getTokenValue();
        session.setAttribute("accessToken", accessToken);

        String id = attributes.get("id").toString();
        String nickname = profile != null && profile.get("nickname") != null ? profile.get("nickname").toString() : "User" + UUID.randomUUID().toString().substring(0, 6);
        String password = UUID.randomUUID().toString(); // 임의의 비밀번호 설정
        String name = profile != null && profile.get("nickname") != null ? profile.get("nickname").toString() : "Kakao User"; // 기본 이름 설정
        String birthday = kakaoAccount != null && kakaoAccount.get("birthday") != null ? kakaoAccount.get("birthday").toString() : null;

        // 사용자 정보 처리
        User user = userMapper.findById(id);
        if (user == null) {
            user.setId(id);
            user.setNickname(nickname);
            user.setPassword(password); // 임의의 비밀번호 설정
            user.setName(name); // 기본 이름 설정
            userMapper.save(user);
        }

        user.setState(1);
        userMapper.savestate(user);

        session.setAttribute("me", user);

        return oauth2User;
    }
}