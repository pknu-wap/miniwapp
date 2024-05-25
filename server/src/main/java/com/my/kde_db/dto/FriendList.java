package com.my.kde_db.dto;

import lombok.Data;

import java.util.List;

@Data
public class FriendList {
    private int usercount = 0;
    private List<FriendInfo> data = null;
}
