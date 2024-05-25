package com.my.kde_db.service;

import com.my.kde_db.dao.VisitorBoardMapper;
import com.my.kde_db.dto.VisitorComment;
import com.my.kde_db.dto.VisitorPost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VisitorBoardService {
    @Autowired
    VisitorBoardMapper visitorBoardMapper;

    public List<VisitorPost> findByUNumPNum(int owner_number, int page_number) {
        int offset=(page_number-1)*5;
        return visitorBoardMapper.findByUNumPNum(owner_number,offset);
    }

    public void createVisitorPost (VisitorPost visitorPost,int owner_number){
        visitorBoardMapper.createVisitorPost(visitorPost,owner_number);
    }

    public void updatePost(VisitorPost visitorPost){
        visitorBoardMapper.updatePost(visitorPost);
    }
    public void deletePost(int number){
        visitorBoardMapper.deletePost(number);
    }

    public void createComment (VisitorComment visitorComment, int owner_number, int number){
        visitorBoardMapper.createComment(visitorComment,owner_number,number);
    }

    public void updateComment(VisitorComment visitorComment,int number){
        visitorBoardMapper.updateComment(visitorComment,number);
    }
    public void deleteComment(int number){
        visitorBoardMapper.deleteComment(number);
    }

}
