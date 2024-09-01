package com.my.kde_db.config;

import com.my.kde_db.vo.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {

    private final User user;

    public CustomUserDetails() {
        this.user = new User();
    }
    public CustomUserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // 모든 사용자에게 동일한 권한 부여
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    }
    public String getNickname() { return user.getNickname(); }
    @Override
    public String getPassword() {
        return user.getPassword(); // 사용자 비밀번호
    }

    @Override
    public String getUsername() {
        return user.getId(); // 사용자 아이디
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public User getUser() {
        return user;
    }
}

