package com.my.kde_db.service;

import com.my.kde_db.dto.PostDetails;
import com.my.kde_db.vo.User;
import com.my.kde_db.dao.PostMapper;
import com.my.kde_db.dto.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostMapper postMapper;

    public boolean writePost(Post post){
        return postMapper.writePost(post);
    }
    public List<Post> getPostsByUserAndPage(int userNumber, int pageNumber) {
        int offset = (pageNumber - 1) * 10;
        return postMapper.findPostsByUserAndPage(userNumber, offset);
    }
    public PostDetails getPostDetails(int postNumber) {

        return postMapper.findPostDetailsByNumber(postNumber);
    }
    public boolean deletePost(int postNumber, int userId) {
        Post post = postMapper.findPostById(postNumber);
        if (post != null && post.getNumber() == userId) {
            return postMapper.deletePost(postNumber);
        }
        return false;



}}
