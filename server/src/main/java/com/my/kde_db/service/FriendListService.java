package com.my.kde_db.service;

import com.my.kde_db.dao.FriendInfoRepository;
import com.my.kde_db.dto.FriendInfo;
import com.my.kde_db.entity.FriendInfoEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FriendListService {

    @Autowired
    FriendInfoRepository friendInfoRepository;

    public List<FriendInfo> findAllUsersExceptUserId(String userId) {
        List<FriendInfoEntity> entities = friendInfoRepository.findAllUsersExceptUserId(userId);
        return entities.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public int getUserCountExcludingCurrentUser(String userId) {
        return friendInfoRepository.getUserCountExcludingCurrentUser(userId);
    }

    private FriendInfo convertToDto(FriendInfoEntity entity) {
        FriendInfo dto = new FriendInfo();
        dto.setNumber(entity.getNumber());
        dto.setName(entity.getName());
        dto.setNickname(entity.getNickname());
        dto.setImage(entity.getImage());
        return dto;
    }
}
