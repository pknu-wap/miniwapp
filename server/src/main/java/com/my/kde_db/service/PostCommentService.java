package com.my.kde_db.service;

import com.my.kde_db.dao.PostCommentRepository;
import com.my.kde_db.dto.PostComment;
import com.my.kde_db.entity.PostCommentEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PostCommentService {
    @Autowired
    private PostCommentRepository postCommentRepository;

    public boolean writeComment(PostComment postComment) {
        PostCommentEntity commentEntity = new PostCommentEntity();
        commentEntity.setPostNumber(postComment.getPost_number());
        commentEntity.setUserNumber(postComment.getUser_number());
        commentEntity.setComment(postComment.getComment());
        commentEntity.setDate(postComment.getDate());
        commentEntity.setName(postComment.getName());
        commentEntity.setNickname(postComment.getNickname());

        postCommentRepository.save(commentEntity);
        return true;
    }
    @Transactional
    public boolean deleteComment(int commentId, int postId) {
        postCommentRepository.deleteComment(commentId, postId);
        return true;
    }
}
