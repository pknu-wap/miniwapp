package com.my.kde_db.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "post_comment")
@IdClass(PostCommentId.class)
@Data
public class PostCommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "number")
    private int cNumber;

    @Id
    @Column(name = "post_number")
    private int postNumber;

    @Id
    @Column(name = "user_number")
    private int userNumber;

    private String comment;

    private Date date;

}
