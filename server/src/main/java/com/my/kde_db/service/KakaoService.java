package com.my.kde_db.service;

import com.my.kde_db.vo.SimpleUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class KakaoService {
    public SimpleUser getUserFromOAuth2User(OAuth2User principal) {
        if (principal == null) {
            return null;
        }

        // 사용자 속성 가져오기
        Map<String, Object> attributes = principal.getAttributes();

        // properties 필드를 Map으로 캐스팅
        @SuppressWarnings("unchecked")
        Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");

        // 사용자 ID와 닉네임 추출
        String userId = attributes.get("id").toString();
        String nickname = (properties != null) ? (String) properties.get("nickname") : null;

        // User 객체 생성 및 반환
        SimpleUser user = new SimpleUser();
        user.setId(userId);
        user.setName(nickname);

        return user;
    }

}
