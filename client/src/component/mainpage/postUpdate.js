import React, { useState, useEffect } from 'react';
import API from '../utils/API'
import styled from 'styled-components';

const PostUpdateContainer = styled.div`
  padding: 20px;
`;

const PostUpdateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const SortButton = styled.button`
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
`;

const PostUpdateTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  background-color: #f2f2f2;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f1f1f1;
  }
`;

function PostUpdate() {
  const [posts, setPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState('new');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await API.get(`mainpage/${sortOrder === 'new' ? 'new_post' : 'hot_post'}`, {withCredentials: true});
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    
    fetchPosts();
  }, [sortOrder]);

  return (
    <PostUpdateContainer>
      <PostUpdateHeader>
        <SortButton onClick={() => setSortOrder(sortOrder === 'new' ? 'hot' : 'new')}>
          {sortOrder === 'new' ? '최신순' : '조회순'}
        </SortButton>
      </PostUpdateHeader>
      <PostUpdateTable>
        <thead>
          <tr>
            <TableHeader>제목</TableHeader>
            <TableHeader>작성자</TableHeader>
            <TableHeader>조회수</TableHeader>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <TableRow key={post.number}>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.name}</TableCell>
              <TableCell>{post.viewCount}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </PostUpdateTable>
    </PostUpdateContainer>
  );
}

export default PostUpdate;