package com.my.kde_db.service;

import com.my.kde_db.dao.PostCommentRepository;
import com.my.kde_db.dao.PostRepository;
import com.my.kde_db.dao.UserRepository;
import com.my.kde_db.dto.Post;
import com.my.kde_db.dto.PostComment;
import com.my.kde_db.dto.PostDetails;
import com.my.kde_db.entity.PostCommentEntity;
import com.my.kde_db.entity.PostEntity;
import com.my.kde_db.entity.UserEntity;
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

    @Autowired
    private UserRepository userRepository; // User 정보를 가져오기 위해 추가

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

        // ownerNumber로 UserEntity를 조회
        UserEntity userEntity = userRepository.findById(ownerNumber).orElse(null);

        PostDetails postDetails = new PostDetails();
        postDetails.setTitle(postEntity.getTitle());
        postDetails.setContents(postEntity.getContents());
        postDetails.setViewCount(postEntity.getViewCount());

        // 작성자의 name과 nickname을 설정
        if (userEntity != null) {
            postDetails.setName(userEntity.getName());
            postDetails.setNickname(userEntity.getNickname());
        }

        // 댓글 정보 설정
        List<PostCommentEntity> commentEntities = postCommentRepository.findCommentsByPostNumber(postNumber);
        List<PostComment> comments = commentEntities.stream()
                .map(commentEntity -> {
                    PostComment comment = convertToDTO(commentEntity);

                    // 댓글 작성자의 name과 nickname을 설정
                    UserEntity commentUserEntity = userRepository.findById(commentEntity.getUserNumber()).orElse(null);
                    if (commentUserEntity != null) {
                        comment.setName(commentUserEntity.getName());
                        comment.setNickname(commentUserEntity.getNickname());
                    }

                    return comment;
                })
                .collect(Collectors.toList());

        postDetails.setComments(comments);

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

