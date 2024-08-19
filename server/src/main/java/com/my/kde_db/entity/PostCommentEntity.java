package com.my.kde_db.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "post_comment")
@Data
public class PostCommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "number")
    private int cNumber;

    @Column(name = "post_number")
    private int postNumber;

    @Column(name = "user_number")
    private int userNumber;

    private String comment;

    private Date date;

    // name과 nickname 필드는 적절한 외래키 매핑 필요
    private String name;
    private String nickname;
}
