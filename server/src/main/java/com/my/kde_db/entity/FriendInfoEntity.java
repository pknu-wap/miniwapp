package com.my.kde_db.entity;

import lombok.Data;
import javax.persistence.*;

@Entity
@Table(name = "user")
@Data
public class FriendInfoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "number")
    private int number;

    @Column(name = "id")
    private String userId;  // userId 필드를 추가

    @Column(name = "name")
    private String name;

    @Column(name = "nickname")
    private String nickname;

    @Lob
    @Column(name = "image")
    private byte[] image;
}
