package com.my.kde_db.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "post")
@Data
public class PostInfoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int number;

    @Column(name = "title")
    private String title;

    @ManyToOne
    @JoinColumn(name = "user_number")
    private UserHomeEntity user;
}
