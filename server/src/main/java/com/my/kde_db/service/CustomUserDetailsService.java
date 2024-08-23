package com.my.kde_db.service;

import com.my.kde_db.config.CustomUserDetails;
import com.my.kde_db.service.UserService;
import com.my.kde_db.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private UserService userService;
    @Autowired
    public CustomUserDetailsService(@Lazy UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User u1 = userService.findById(username);
        if (u1 != null) {
            return new CustomUserDetails(u1);
        } else {
            throw new UsernameNotFoundException("User not found");
        }
    }
}
