package com.my.kde_db.service;

import com.my.kde_db.dao.PostCommentRepository;
import com.my.kde_db.dao.PostRepository;
import com.my.kde_db.dto.Post;
import com.my.kde_db.dto.PostComment;
import com.my.kde_db.dto.PostDetails;
import com.my.kde_db.entity.PostCommentEntity;
import com.my.kde_db.entity.PostEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostCommentRepository postCommentRepository;

    public boolean writePost(Post post) {
        PostEntity postEntity = new PostEntity();
        postEntity.setUserNumber(post.getNumber());
        postEntity.setTitle(post.getTitle());
        postEntity.setContents(post.getContents());
        postEntity.setDate(post.getDate());
        postEntity.setViewCount(post.getViewCount());

        postRepository.save(postEntity);
        return true;
    }

    public List<Post> getPostsByUserAndPage(int userNumber, int pageNumber) {
        // 페이지 요청 생성 (페이지 번호는 0부터 시작, 페이지당 10개의 항목)
        PageRequest pageable = PageRequest.of(pageNumber - 1, 10);
        return postRepository.findPostsByUserAndPage(userNumber, pageable)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public PostDetails getPostDetails(int postNumber, int ownerNumber) {
        postRepository.incrementViewCount(postNumber);
        PostEntity postEntity = postRepository.findPostDetailsByNumber(postNumber, ownerNumber);

        PostDetails postDetails = new PostDetails();
        postDetails.setTitle(postEntity.getTitle());
        postDetails.setContents(postEntity.getContents());
        postDetails.setViewCount(postEntity.getViewCount());

        List<PostCommentEntity> commentEntities = postCommentRepository.findCommentsByPostNumber(postNumber);
        postDetails.setComments(commentEntities.stream().map(this::convertToDTO).collect(Collectors.toList()));

        return postDetails;
    }

    public boolean deletePost(int postNumber) {
        postRepository.deleteById(postNumber);
        return true;
    }

    private Post convertToDTO(PostEntity postEntity) {
        Post post = new Post();
        post.setP_number(postEntity.getPNumber());
        post.setNumber(postEntity.getUserNumber());
        post.setTitle(postEntity.getTitle());
        post.setContents(postEntity.getContents());
        post.setDate(postEntity.getDate());
        post.setViewCount(postEntity.getViewCount());
        return post;
    }

    private PostComment convertToDTO(PostCommentEntity commentEntity) {
        PostComment comment = new PostComment();
        comment.setC_number(commentEntity.getCNumber());
        comment.setPost_number(commentEntity.getPostNumber());
        comment.setUser_number(commentEntity.getUserNumber());
        comment.setComment(commentEntity.getComment());
        comment.setDate(commentEntity.getDate());

        return comment;
    }
}
