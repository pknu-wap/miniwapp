package com.my.kde_db.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "post")
@Data
public class PostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "number")
    private int pNumber;

    @Column(name = "user_number")
    private int userNumber;

    private String title;

    private String contents;

    private LocalDateTime date;

    @Column(name = "view_count")
    private int viewCount;
}