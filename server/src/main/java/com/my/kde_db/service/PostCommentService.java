package com.my.kde_db.service;

import com.my.kde_db.dao.PostCommentMapper;
import com.my.kde_db.dto.PostComment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostCommentService {
    @Autowired
    private PostCommentMapper postCommentMapper;

    public boolean writeComment(PostComment postComment) {
        return postCommentMapper.writeComment(postComment);
    }

    public boolean deleteComment(int commentId, int postId) {
        return postCommentMapper.deleteComment(commentId,postId);
    }
}
