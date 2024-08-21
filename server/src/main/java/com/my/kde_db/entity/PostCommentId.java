package com.my.kde_db.entity;

import java.io.Serializable;
import java.util.Objects;

public class PostCommentId implements Serializable {

    private int postNumber;
    private int userNumber;

    public PostCommentId() {}

    public PostCommentId(int postNumber, int userNumber) {
        this.postNumber = postNumber;
        this.userNumber = userNumber;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PostCommentId that = (PostCommentId) o;
        return postNumber == that.postNumber && userNumber == that.userNumber;
    }

    @Override
    public int hashCode() {
        return Objects.hash(postNumber, userNumber);
    }

    // getters and setters
}
