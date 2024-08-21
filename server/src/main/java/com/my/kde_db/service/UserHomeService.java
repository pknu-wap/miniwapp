package com.my.kde_db.service;

import com.my.kde_db.dao.UserHomeRepository;
import com.my.kde_db.dto.PostInfo;
import com.my.kde_db.dto.UserHome;
import com.my.kde_db.entity.PostInfoEntity;
import com.my.kde_db.entity.UserHomeEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserHomeService {

    @Autowired
    private UserHomeRepository userHomeRepository;
    public UserHome findUserHomeByNumber(int number) {
        UserHomeEntity userHomeEntity = userHomeRepository.findByNumber(number);

        if (userHomeEntity == null) {
            UserHome youtubeNullUserhome = new UserHome();
            youtubeNullUserhome.setYoutubelink("null");
            youtubeNullUserhome.setPosts(getPostInfoList(userHomeRepository.findLatestPost(number)));
            return youtubeNullUserhome;
        }

        UserHome userHome = new UserHome();
        userHome.setYoutubelink(userHomeEntity.getYoutubeLink());
        userHome.setPosts(getPostInfoList(userHomeRepository.findLatestPost(number)));

        return userHome;
    }

    private List<PostInfo> getPostInfoList(List<PostInfoEntity> postEntities) {
        return postEntities.stream()
                .map(post -> {
                    PostInfo postInfo = new PostInfo();
                    postInfo.setNumber(post.getNumber());
                    postInfo.setTitle(post.getTitle());
                    return postInfo;
                })
                .collect(Collectors.toList());
    }
}